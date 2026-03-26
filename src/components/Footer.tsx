import React from 'react';

const Footer: React.FC = () => {
  const links = [
    'Postage Inflation PDF',
    'Notice-to-Owner Map',
    'Zero-Trust Engine',
    'Privacy'
  ];

  return (
    <footer className="bg-[#091d2e] dark:bg-black w-full mt-auto py-12 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 max-w-7xl mx-auto items-center">
        <div>
          <span className="text-[#f7f9ff] font-black text-2xl uppercase tracking-tighter">LienFlow</span>
          <p className="font-headline text-[10px] font-bold uppercase tracking-widest text-[#2CA01C] mt-4">
            © 2024 LienFlow Audit Shield. USPS CASS Certified.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 md:justify-end">
          {links.map((link, i) => (
            <a
              key={i}
              className="font-headline text-[10px] font-bold uppercase tracking-widest text-[#f7f9ff]/60 hover:text-white transition-colors"
              href="#"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
