/**
 * Cloudflare Pages Function - secure toyyibpay fpx checkout endpoint
 * handles: POST /api/checkout
 */
export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const body = await request.json();
        
        // 1. Get credentials securely from environment variables (Cloudflare Dashboard)
        // If not set in Cloudflare, fallback to frontend parameters for testing
        const userSecretKey = env.TOYYIBPAY_SECRET_KEY || body.secretKey;
        const categoryCode = env.TOYYIBPAY_CATEGORY_CODE || body.categoryCode;
        
        // Validation check
        if (!userSecretKey || userSecretKey === "TOYYIBPAY_USER_SECRET_KEY" || !categoryCode || categoryCode === "TOYYIBPAY_CATEGORY_CODE") {
            return new Response(JSON.stringify({
                success: false,
                message: "Ralat Konfigurasi: Sila tetapkan TOYYIBPAY_SECRET_KEY dan TOYYIBPAY_CATEGORY_CODE di dashboard Cloudflare Pages / fail env."
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 2. Prepare request payload for ToyyibPay (expects URL Encoded Form-Data)
        const formData = new URLSearchParams();
        formData.append("userSecretKey", userSecretKey);
        formData.append("categoryCode", categoryCode);
        formData.append("billName", "Tempahan Telekung Premium");
        formData.append("billDescription", body.orderDetails || "Set Telekung Premium Eksklusif");
        formData.append("billPriceSetting", "1"); // 1 = Fixed Price, 2 = Dynamic Price
        formData.append("billPayeeInfo", "1"); // 1 = Include Payee info, 0 = Do not include
        
        // ToyyibPay expects price in Cents (RM89.00 -> 8900)
        const amountInCents = Math.round(parseFloat(body.amount) * 100);
        formData.append("billAmount", amountInCents.toString());
        
        // Auto-detect origin URL for redirects
        const origin = new URL(request.url).origin;
        formData.append("billReturnUrl", `${origin}/?status=success`);
        formData.append("billCallbackUrl", `${origin}/api/callback`); // Payment Webhook
        formData.append("billExternalReferenceNo", `TLK-${Date.now()}`);
        formData.append("billTo", body.name);
        formData.append("billEmail", body.email);
        formData.append("billPhone", body.phone);
        formData.append("billSplitPayment", "0");
        formData.append("billPaymentChannel", "0"); // 0 = FPX (Bank Transfer), 1 = Credit Card, 2 = Both

        // 3. Select ToyyibPay endpoint (Sandbox vs Production)
        // Set env.TOYYIBPAY_PRODUCTION = "true" in Cloudflare configuration for real transactions
        const isProduction = env.TOYYIBPAY_PRODUCTION === "true";
        const toyyibPayUrl = isProduction
            ? "https://toyyibpay.com/index.php/api/createBill"
            : "https://dev.toyyibpay.com/index.php/api/createBill";

        console.log(`Menghantar permohonan ke ToyyibPay (${isProduction ? 'PROD' : 'SANDBOX'}): ${toyyibPayUrl}`);

        const toyyibPayResponse = await fetch(toyyibPayUrl, {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        if (!toyyibPayResponse.ok) {
            return new Response(JSON.stringify({
                success: false,
                message: `ToyyibPay gateway returned HTTP status: ${toyyibPayResponse.status}`
            }), {
                status: 502,
                headers: { "Content-Type": "application/json" }
            });
        }

        const data = await toyyibPayResponse.json();
        
        // ToyyibPay returns bills as an array element: [{"BillCode":"xxxxx"}]
        if (data && data[0] && data[0].BillCode) {
            const billCode = data[0].BillCode;
            const redirectUrl = isProduction
                ? `https://toyyibpay.com/${billCode}`
                : `https://dev.toyyibpay.com/${billCode}`;

            return new Response(JSON.stringify({
                success: true,
                redirectUrl: redirectUrl
            }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            console.error("Ralat jawapan ToyyibPay:", data);
            return new Response(JSON.stringify({
                success: false,
                message: data.msg || "Gagal menjana Kod Bil dari ToyyibPay.",
                raw: data
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

    } catch (error) {
        console.error("Serverless Worker Error:", error);
        return new Response(JSON.stringify({
            success: false,
            message: `Ralat Dalaman Pelayan: ${error.message}`
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
