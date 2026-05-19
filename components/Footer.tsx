"use client";

import { motion } from "framer-motion";
import Link from "next/link";
// Brand icons via inline SVG (lucide-react v1 removed brand icons)

const navGroups = {
  Projetos: [
    { label: "Residencial", href: "#" },
    { label: "Comercial", href: "#" },
    { label: "Interiores", href: "#" },
    { label: "Ver Todos", href: "#projetos" },
  ],
  Escritório: [
    { label: "Sobre Nós", href: "#sobre" },
    { label: "Nossa Equipe", href: "#" },
    { label: "Prêmios", href: "#" },
  ],
  Conteúdo: [
    { label: "Blog", href: "/blog" },
    { label: "Publicações", href: "#" },
    { label: "Imprensa", href: "#" },
  ],
};

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <div className="font-serif text-xl font-light text-white tracking-[0.2em] uppercase mb-3">
                Plano Arq
              </div>
              <p className="text-sm leading-relaxed text-stone-500 max-w-xs">
                Arquitetura de alto padrão que transcende o tempo e revela a
                essência de cada lugar.
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: InstagramIcon, label: "Instagram", href: "#" },
                { Icon: LinkedinIcon, label: "LinkedIn", href: "#" },
                { Icon: YoutubeIcon, label: "YouTube", href: "#" },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  className="w-9 h-9 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-stone-600 transition-all duration-300"
                >
                  <Icon />
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/5511999999999"
                aria-label="WhatsApp"
                whileHover={{ y: -2 }}
                className="w-9 h-9 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-stone-600 transition-all duration-300"
              >
                <WhatsAppIcon />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Pinterest"
                whileHover={{ y: -2 }}
                className="w-9 h-9 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-stone-600 transition-all duration-300"
              >
                <PinterestIcon />
              </motion.a>
            </div>
          </div>

          {/* Nav Groups */}
          {Object.entries(navGroups).map(([category, links]) => (
            <div key={category} className="lg:col-span-2">
              <h4 className="text-[10px] text-stone-500 tracking-[0.3em] uppercase mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] text-stone-500 tracking-[0.3em] uppercase mb-5">
              Escritório
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <p>
                Av. Paulista, 1374
                <br />
                São Paulo, SP — 01310-100
              </p>
              <p>contato@planoarq.com.br</p>
              <p>+55 (11) 3456-7890</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} Plano Arq. Todos os
            direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-stone-600 hover:text-stone-400 transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              href="#"
              className="text-xs text-stone-600 hover:text-stone-400 transition-colors"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
