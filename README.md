# RomiNova

> **Build. Explore. Simplify.**

RomiNova is a modern, responsive personal productivity web application built with React, Vite, and Lucide icons. It features a dark startup UI with deep navy palettes, teal and cyan accents, and smooth client-side workflows without server reliance.

---

## 🚀 Included Apps

1. **Calculator**: Complete arithmetic calculations (+, -, ×, ÷, %), backspace, clear, decimal accuracy, and keyboard-style responsive layout.
2. **Calendar**: Monthly view with previous/next transitions, date selector, multi-event scheduling, and persistent storage using `localStorage`.
3. **Notes**: Note-taking interface with creation timestamps, real-time query searching, note removal, and `localStorage` synchronization.
4. **Converter**: Physical unit transformation engine covering:
   - **Length**: meter, km, cm, mile, foot
   - **Weight**: kg, gram, pound
   - **Temperature**: Celsius, Fahrenheit, Kelvin
5. **Dev Tools**: Essential offline utilities:
   - JSON Prettifier & Minifier with syntax validation
   - Base64 Encoder & Decoder
   - URL Codec engine

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Icons**: lucide-react
- **Routing**: Hash-based single page router (`#/calculator`, `#/calendar`, `#/notes`, `#/converter`, `#/dev-tools`)
- **Storage**: Browser `localStorage`

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Deployment

### Deploy to Vercel
1. Push the code to a GitHub repository.
2. Link the repository on [Vercel](https://vercel.com).
3. The framework preset is automatically detected as **Vite**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy with one click.
