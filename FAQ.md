# TF2 Steam Bot - Frequently Asked Questions

## Installation & Setup

**Q: Do I need programming knowledge to use this bot?**
A: No! Just follow the setup.bat instructions. Everything is automated.

**Q: My antivirus is blocking the bot**
A: This is a false positive. The bot is safe. Add the folder to your antivirus whitelist.

**Q: Can I run this on Mac/Linux?**
A: Yes! Replace `.bat` files with shell scripts. Use `npm start` instead.

**Q: How do I update the bot?**
A: Pull the latest version from the repository or replace files. Your data is stored separately.

## Discord Bot Setup

**Q: Where do I get the Discord token?**
A: Go to https://discord.com/developers/applications, create an app, and copy the bot token.

**Q: What permissions does the bot need?**
A: Send Messages, Read Message History, Embed Links, Add Reactions.

**Q: The bot doesn't respond to commands**
A: 
1. Make sure the bot has permissions in the channel
2. Verify the token is correct in `.env`
3. Restart the bot
4. Check if you're using the correct prefix (default: !)

**Q: How do I invite the bot to my server?**
A: Go to Developer Portal → OAuth2 → URL Generator → select "bot" and copy the URL.

## Trading & Crypto

**Q: What cryptocurrencies are supported?**
A: BTC, ETH, USDC, USDT initially, with 400+ extensible support via Binance.

**Q: Is there a minimum trade amount?**
A: Minimums depend on the cryptocurrency. Use `!mins <crypto>` to check.

**Q: How much do withdrawals cost?**
A: Use `!fees <crypto>` to see current withdrawal fees.

**Q: What's the exchange rate?**
A: Use `!prices <crypto>` for live prices updated every minute.

**Q: Can users trade without a Steam account?**
A: No, they must set a valid trade link first using `!tradelink`.

## Account & Security

**Q: Is my money safe with this bot?**
A: Yes, the bot uses:
- SSL/TLS encryption for all communications
- Crypto address validation
- Anti-scam protection protocols
- Detailed transaction logging

**Q: What if I lose my private keys?**
A: Store them somewhere safe. The bot doesn't store private keys, only manages transactions.

**Q: Can I recover a deleted account?**
A: Yes, if you remember your Discord ID. Contact the bot administrator.

**Q: Is there a transaction fee?**
A: Yes, small trading fees apply (0.1%) plus cryptocurrency network fees.

## Commands & Features

**Q: How do I buy TF2 keys?**
A: Use `!buy <amount> <crypto>` (e.g., `!buy 10 btc`)

**Q: How do I sell TF2 keys?**
A: Use `!sell <amount> <crypto>` (e.g., `!sell 5 eth`)

**Q: What language does the bot support?**
A: English, Spanish, Chinese, Serbian, German. Use `!lang <code>` to switch.

**Q: How do I set up stock alerts?**
A: Use `!stockalert on <amount>` to get notified when stock drops below a threshold.

**Q: What does `!prices` show?**
A: Current cryptocurrency prices updated every minute from Binance API.

## Troubleshooting

**Q: The bot won't start - "Cannot find module"**
A: Run `setup.bat` again to install dependencies properly.

**Q: Prices aren't updating**
A: This could be a Binance API issue. The bot caches prices for 1 minute.

**Q: Error: "user not registered"**
A: You need to set your trade link first using `!tradelink <url>`

**Q: The database is corrupted**
A: Delete the `.db` file in the `/data` folder. It will be recreated.

**Q: How do I reset my account?**
A: Contact the bot administrator for data reset options.

## Administration

**Q: Can I set up multiple instances of this bot?**
A: Yes, but use separate Discord bots and separate databases.

**Q: How do I backup my data?**
A: Copy the entire `/data` folder to a safe location.

**Q: Can I add more cryptocurrencies?**
A: Yes, edit `src/config/crypto.js` and add new coins to the Binance API list.

**Q: How do I change withdrawal fees?**
A: Edit `src/config/crypto.js` and update the fees object.

## Performance & Monitoring

**Q: How many concurrent trades can the bot handle?**
A: Hundreds per second depending on your hardware and database.

**Q: Does the bot log all transactions?**
A: Yes, all trades are logged in the database and console logs.

**Q: Where are logs stored?**
A: In the `/logs` folder with daily rotation.

**Q: Can I see bot statistics?**
A: Use `!stats` to see your personal stats or administrator dashboard for full analytics.

## Legal & Compliance

**Q: Is this bot legal?**
A: Yes, as long as you comply with your local regulations for crypto and gaming item trading.

**Q: Do I need a money transmission license?**
A: This depends on your jurisdiction. Consult a lawyer.

**Q: What about KYC/AML?**
A: The bot includes anti-scam protocols but doesn't enforce KYC. You may need this for regulatory compliance.

---

**Can't find your answer?** Contact the bot developer or check the full documentation in `README.md` and `SETUP_GUIDE.md`.
