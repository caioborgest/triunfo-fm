import { Users, Radio, Award } from "lucide-react";
import { Container } from "@triunfo/ui";

const TEAM_MEMBERS = [
  {
    name: "João Almeida",
    role: "Apresentador & Radialista",
    show: "Manhã Triunfo (06h às 09h)",
    bio: "Mais de 15 anos de experiência no rádio sertanejo, levando informação matinal com dinamismo e proximidade com o ouvinte.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    badge: "NO AR AGORA",
  },
  {
    name: "Martinha Souza",
    role: "Locutora & Produtora Cultural",
    show: "Papo Sertanejo (14h às 17h)",
    bio: "Apaixonada pela cultura nordestina, promove a música regional, entrevistas com artistas locais e interação ao vivo.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    badge: "LOCUTORA",
  },
  {
    name: "Rafael Diniz",
    role: "Repórter & Pesquisador",
    show: "Histórias de Triunfo (18h)",
    bio: "Especialista na história do Sertão do Pajeú e patrimônio cultural de Triunfo, responsável pelas matérias investigativas.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    badge: "JORNALISTA",
  },
  {
    name: "Lívia Nogueira",
    role: "Editora-Chefe de Redação",
    show: "Conexão Cultura (12h)",
    bio: "Coordena o fluxo editorial do portal e as transmissões jornalísticas diárias da 87,9 FM com rigor e imparcialidade.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    badge: "EDITORA-CHEFE",
  },
];

export function TeamSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#12002b] via-[#220054] to-[#38007e] text-white relative isolate overflow-hidden border-t border-white/10" id="equipe">
      {/* Ambient background glow for seamless blend */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 size-96 rounded-full bg-[var(--brand-purple-600)]/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 size-96 rounded-full bg-[var(--brand-gold-500)]/10 blur-[120px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--brand-gold-300)] bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <Users className="size-4 text-[var(--brand-gold-500)]" />
            NOSSA COMUNICAÇÃO & REDAÇÃO
          </div>

          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            CONHEÇA A EQUIPE DA TRIUNFO FM
          </h2>

          <p className="text-sm text-white/70 leading-relaxed font-medium">
            Comunicadores, jornalistas e produtores comprometidos em levar a informação com credibilidade e carinho para Triunfo e toda a região.
          </p>
        </div>

        {/* 4 Team Members Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center text-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[var(--brand-gold-500)]/50 hover:bg-white/10"
            >
              {/* Avatar with gold border glow */}
              <div className="relative mb-5">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="size-28 rounded-full object-cover border-3 border-[var(--brand-gold-500)] shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--brand-gold-500)] px-3 py-0.5 text-[9px] font-black uppercase text-black shadow-md">
                  {member.badge}
                </span>
              </div>

              {/* Member Meta */}
              <h3 className="text-xl font-black text-white group-hover:text-[var(--brand-gold-300)] transition-colors">
                {member.name}
              </h3>

              <p className="mt-1 text-xs font-extrabold text-[var(--brand-purple-100)] flex items-center justify-center gap-1">
                <Award className="size-3.5 text-[var(--brand-gold-500)]" />
                {member.role}
              </p>

              <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-white/60 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                <Radio className="size-3 text-[var(--brand-gold-300)]" />
                {member.show}
              </div>

              <p className="mt-4 text-xs text-white/70 leading-relaxed line-clamp-3 font-normal">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
