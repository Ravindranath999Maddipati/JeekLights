# Deploying the Jeek Lights Website

This project is a high-performance, fully static single-page website. Since there are no complex databases, server builds, or frameworks, it can be deployed for free to any static hosting provider.

## Local Development & Preview

To preview the website locally on your computer:

1. **Option A: Simple Double Click**
   - Locate and double-click the `index.html` file in your system file explorer. It will open in your default browser.
   
2. **Option B: Live Server Extension (Recommended)**
   - If using VS Code, install the "Live Server" extension.
   - Click **Go Live** at the bottom right status bar to preview and have auto-reloads on edits.

3. **Option C: Python Quick Server**
   - Run the following command in your terminal inside the project directory:
     ```bash
     python3 -m http.server 8000
     ```
   - Open your browser and navigate to `http://localhost:8000`.

---

## Production Deployment Options

### 1. Netlify (Easiest / Drag & Drop)
Netlify is excellent for static hosting and provides premium CDN speeds:
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the complete `JeekLights` folder directly into the designated drop zone.
3. Your website is instantly live! You can set up a custom domain and add a free SSL certificate.

### 2. Vercel (CLI or Git)
Vercel is optimized for speed and global delivery:
1. Initialize git in the folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Push your project to a GitHub repository.
3. Import the repository into [Vercel Dashboard](https://vercel.com/new).
4. Set the framework option to **Other / Static** and click **Deploy**.

### 3. GitHub Pages
Perfect if you already host your repository on GitHub:
1. In your GitHub repository settings, navigate to the **Pages** tab.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose the `main` or `master` branch and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repository-name>/`.
