function generateEmailTemplate({
  userName,
  subscriptionName,
  renewwalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Renewal Reminder</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #2c3e50;
        }
        
        .message {
            font-size: 16px;
            margin-bottom: 30px;
            line-height: 1.7;
            color: #555;
        }
        
        .subscription-details {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
            border-left: 4px solid #667eea;
        }
        
        .subscription-details h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 18px;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .detail-label {
            font-weight: 600;
            color: #666;
            flex: 1;
        }
        
        .detail-value {
            font-weight: 500;
            color: #2c3e50;
            flex: 1;
            text-align: right;
        }
        
        .renewal-highlight {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin: 30px 0;
        }
        
        .renewal-highlight h3 {
            font-size: 20px;
            margin-bottom: 10px;
        }
        
        .renewal-highlight p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .days-left {
            font-size: 24px;
            font-weight: 700;
            color: #ff6b6b;
            text-align: center;
            margin: 20px 0;
        }
        
        .cta-section {
            text-align: center;
            margin: 40px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 35px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
        }
        
        .support-section {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
            text-align: center;
        }
        
        .support-section h4 {
            color: #2c3e50;
            margin-bottom: 10px;
        }
        
        .support-section p {
            color: #666;
            margin-bottom: 15px;
        }
        
        .support-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
        }
        
        .support-link:hover {
            text-decoration: underline;
        }
        
        .footer {
            background-color: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .footer p {
            margin-bottom: 10px;
            opacity: 0.8;
        }
        
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 0;
            }
            
            .header, .content {
                padding: 30px 20px;
            }
            
            .subscription-details {
                padding: 20px;
            }
            
            .detail-row {
                flex-direction: column;
                text-align: left;
            }
            
            .detail-value {
                text-align: left;
                margin-top: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Subscription Renewal Reminder</h1>
            <p>Your subscription needs your attention</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello ${userName},
            </div>
            
            <div class="message">
                We hope you're enjoying your subscription! This is a friendly reminder that your subscription is coming up for renewal soon.
            </div>
            
            <div class="days-left">
                ${daysLeft} days remaining
            </div>
            
            <div class="subscription-details">
                <h3>Your Subscription Details</h3>
                <div class="detail-row">
                    <div class="detail-label">Plan:</div>
                    <div class="detail-value">${planName}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Price:</div>
                    <div class="detail-value">${price}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Payment Method:</div>
                    <div class="detail-value">${paymentMethod}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Subscription:</div>
                    <div class="detail-value">${subscriptionName}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Renewal Date:</div>
                    <div class="detail-value">${renewwalDate}</div>
                </div>
            </div>
            
            <div class="renewal-highlight">
                <h3>Automatic Renewal</h3>
                <p>Your subscription will automatically renew on ${renewwalDate} unless you make changes to your account.</p>
            </div>
            
            <div class="cta-section">
                <a href="${accountSettingsLink}" class="cta-button">Manage Subscription</a>
            </div>
            
            <div class="message">
                If you want to make any changes to your subscription, update your payment information, or cancel your subscription, please visit your account settings before the renewal date.
            </div>
            
            <div class="support-section">
                <h4>Need Help?</h4>
                <p>If you have any questions or need assistance, our support team is here to help.</p>
                <a href="${supportLink}" class="support-link">Contact Support</a>
            </div>
        </div>
        
        <div class="footer">
            <p>Thank you for being a valued subscriber!</p>
            <p>This email was sent regarding your subscription renewal.</p>
            <p><a href="${accountSettingsLink}">Manage your account settings</a></p>
        </div>
    </div>
</body>
</html>`;
}

export const emailTemplates = [
  {
    label: "7 days before reminder",
    generateSubject: (data) =>
      ` Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data }),
  },
  {
    label: "5 days before reminder",
    generateSubject: (data) =>
      ` ${data.subscriptionName} Renews in 5 days - Stay Subscribed`,
    generateBody: (data) => generateEmailTemplate({ ...data }),
  },
  {
    label: "2 days before reminder",
    generateSubject: (data) =>
      `2 Days Left! ${data.subscriptionName} Subscription Renewal`,
    generateBody: (data) => generateEmailTemplate({ ...data }),
  },
  {
    label: "1 day before reminder",
    generateSubject: (data) =>
      `Final Reminder: ${data.subscriptionName} Renews tomorrow`,
    generateBody: (data) => generateEmailTemplate({ ...data }),
  },
];
