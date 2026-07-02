/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './sell.html',
    './about.html',
    './contact.html',
    './policies.html',
    './js/**/*.js'
  ],
  safelist: [
    'hidden',
    'hidden-view',
    'bg-white/80',
    'bg-white/10',
    'bg-white/20',
    'border-white/30',
    'bg-blue-500/20',
    'focus:ring-blue-500',
    'focus:border-transparent',
    'hover:bg-blue-700',
    'hover:text-blue-600',
    'hover:text-blue-800',
    'hover:border-blue-600',
    'hover:bg-slate-800',
    'hover:bg-slate-700',
    'hover:bg-gray-50',
    'hover:border-gray-300',
    'md:hidden',
    'md:flex',
    'lg:flex-row',
    'xl:grid-cols-4',
    'xl:grid-cols-5'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
