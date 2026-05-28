# Vishwa Rajan | AI Consulting Single-Page Web App

A minimalistic, professional single-page website for an AI consulting practice built with Next.js 14, Tailwind CSS, Framer Motion, and Supabase.

---

## Local Setup

### 1. Prerequisites
You need **Node.js (v18.x or later)** and **npm** installed on your system.

### 2. Installation
Install the project dependencies:
```bash
npm install
```

### 3. Local Environment Variables
Create a `.env.local` file at the root of the project:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Running Locally
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Supabase Database Configuration

Follow these steps to configure your Supabase backend to store submissions:

### 1. Create a Supabase Project
1. Log in to [Supabase](https://supabase.com/).
2. Click **New Project** and select your organization.
3. Name your project (e.g. `vishwa-ai-consulting`) and set a secure database password.
4. Wait for the database instance to finish provisioning (usually takes 1-2 minutes).

### 2. Create the Table
1. In the Supabase project sidebar, go to the **SQL Editor**.
2. Click **New Query**.
3. Copy, paste, and run the SQL below to create the `contact_submissions` table:
   ```sql
   create table contact_submissions (
     id uuid default gen_random_uuid() primary key,
     name text not null,
     firm text,
     email text not null,
     message text not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```
4. Click **Run** to execute the query.

### 3. Configure Security Rules (Row Level Security)
To ensure people can submit the form but cannot read other people's submissions:
1. Go to the SQL Editor and run the following queries to enable Row Level Security (RLS) and define insert-only access:
   ```sql
   -- Enable RLS on the table
   alter table contact_submissions enable row level security;

   -- Allow anyone to insert (submit the contact form)
   create policy "Enable insert for anonymous users" 
   on contact_submissions 
   for insert 
   with check (true);
   ```

### 4. Retrieve Credentials
1. Go to **Project Settings** (gear icon in sidebar) -> **API**.
2. Copy the URL under **Project URL** (this is `NEXT_PUBLIC_SUPABASE_URL`).
3. Copy the key under **Project API keys** labeled `anon` `public` (this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`).

---

## Viewing Submissions in Supabase

To view form submissions sent by website visitors:
1. Open your [Supabase Dashboard](https://supabase.com/).
2. Select your project.
3. Click on the **Table Editor** (grid icon in sidebar).
4. Click on the `contact_submissions` table.
5. All name, firm, email, message entries, and submission times will be displayed in the spreadsheet view.

---

## Step-by-Step Vercel Deployment

Follow the guide below to deploy your website live using GitHub and Vercel:

### 1. Push to GitHub
1. Create a new repository on [GitHub](https://github.com/) named `vishwa-ai-consulting`. Set it to **Private** or **Public**.
2. Open your local terminal, navigate to this project folder, and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
   git push -u origin main
   ```

### 2. Import into Vercel
1. Log in to your [Vercel Account](https://vercel.com/).
2. Click **Add New...** -> **Project**.
3. Import your `vishwa-ai-consulting` repository.

### 3. Add Environment Variables
Before clicking "Deploy", expand the **Environment Variables** section and add:
- Key: `NEXT_PUBLIC_SUPABASE_URL` | Value: Your actual Supabase URL
- Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Value: Your actual Supabase Anon Key

### 4. Deploy
Click **Deploy**. Vercel will build the website, link it to your GitHub repository (for automatic redeploys on every code push), and provide you with a live URL (e.g. `https://vishwa-ai-consulting.vercel.app`).
