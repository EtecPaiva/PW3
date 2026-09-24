import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Page =
  | 'login'
  | 'dashboard'
  | 'funcionarios'
  | 'instrutores'
  | 'treinamentos'
  | 'treinamento-detalhe'
  | 'certificados'
  | 'usuarios'
  | 'auditoria'

interface Funcionario { id: number; nome: string; matricula: string; cargo: string; setor: string }
interface Instrutor { id: number; nome: string; especialidade: string; registro: string; email: string; interno: boolean }
interface Treinamento { id: number; titulo: string; descricao: string; cargaHoraria: number; status: string; dataInicio: string; dataFim: string }
interface Certificado { id: number; numero: string; dataEmissao: string; dataValidade: string; status: string; funcionario: string; treinamento: string }
interface Usuario { id: number; email: string; funcionario: string; ativo: boolean; criadoEm: string }
interface Auditoria { id: number; entidade: string; acao: string; usuario: string; detalhe: string; realizadoEm: string }

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockFuncionarios: Funcionario[] = [
  { id: 1, nome: 'Ana Beatriz Lima', matricula: 'F-001', cargo: 'Analista de RH', setor: 'Recursos Humanos' },
  { id: 2, nome: 'Carlos Eduardo Santos', matricula: 'F-002', cargo: 'Engenheiro de Segurança', setor: 'Segurança do Trabalho' },
  { id: 3, nome: 'Fernanda Oliveira', matricula: 'F-003', cargo: 'Técnica de Qualidade', setor: 'Qualidade' },
  { id: 4, nome: 'Gabriel Mendes', matricula: 'F-004', cargo: 'Coordenador de Produção', setor: 'Produção' },
  { id: 5, nome: 'Helena Costa', matricula: 'F-005', cargo: 'Auxiliar Administrativo', setor: 'Administração' },
  { id: 6, nome: 'Igor Fernandes', matricula: 'F-006', cargo: 'Operador de Máquinas', setor: 'Produção' },
  { id: 7, nome: 'Juliana Rocha', matricula: 'F-007', cargo: 'Analista de TI', setor: 'Tecnologia' },
  { id: 8, nome: 'Lucas Almeida', matricula: 'F-008', cargo: 'Técnico de Manutenção', setor: 'Manutenção' },
]

const mockInstrutores: Instrutor[] = [
  { id: 1, nome: 'Dr. Roberto Faria', especialidade: 'NR-35 - Trabalho em Altura', registro: 'CREA-SP 123456', email: 'roberto.faria@example.com', interno: false },
  { id: 2, nome: 'Eng. Patrícia Sousa', especialidade: 'CIPA e Primeiros Socorros', registro: 'CRQ-IV 987654', email: 'patricia.sousa@empresa.com', interno: true },
  { id: 3, nome: 'Prof. André Tavares', especialidade: 'ISO 9001 e Qualidade', registro: 'CBA 456789', email: 'andre.tavares@example.com', interno: false },
  { id: 4, nome: 'Camila Ramos', especialidade: 'Brigada de Incêndio', registro: 'CBPMESP 321', email: 'camila.ramos@empresa.com', interno: true },
  { id: 5, nome: 'Marcos Vieira', especialidade: 'Operação de Empilhadeiras', registro: 'SENAI-PR 654', email: 'marcos.vieira@example.com', interno: false },
]

const mockTreinamentos: Treinamento[] = [
  { id: 1, titulo: 'NR-35 – Trabalho em Altura', descricao: 'Capacitação obrigatória para trabalho em alturas superiores a 2 metros.', cargaHoraria: 8, status: 'concluido', dataInicio: '2024-10-01', dataFim: '2024-10-01' },
  { id: 2, titulo: 'Brigada de Incêndio – Nível Básico', descricao: 'Formação de brigadistas conforme IN-16.', cargaHoraria: 16, status: 'em_andamento', dataInicio: '2024-11-10', dataFim: '2024-11-11' },
  { id: 3, titulo: 'ISO 9001:2015 – Auditores Internos', descricao: 'Formação de auditores internos do sistema de gestão da qualidade.', cargaHoraria: 24, status: 'planejado', dataInicio: '2024-12-05', dataFim: '2024-12-07' },
  { id: 4, titulo: 'CIPA – Comissão Interna de Prevenção', descricao: 'Treinamento obrigatório para membros da CIPA conforme NR-5.', cargaHoraria: 20, status: 'concluido', dataInicio: '2024-09-15', dataFim: '2024-09-17' },
  { id: 5, titulo: 'Operação de Empilhadeiras', descricao: 'Habilitação para operadores de empilhadeiras elétricas e a combustão.', cargaHoraria: 40, status: 'planejado', dataInicio: '2025-01-20', dataFim: '2025-01-24' },
  { id: 6, titulo: 'Primeiros Socorros e RCP', descricao: 'Técnicas de primeiros socorros, RCP e uso do DEA.', cargaHoraria: 8, status: 'concluido', dataInicio: '2024-08-22', dataFim: '2024-08-22' },
]

const mockCertificados: Certificado[] = [
  { id: 1, numero: 'CERT-2024-0001', dataEmissao: '2024-10-02', dataValidade: '2025-10-02', status: 'valido', funcionario: 'Ana Beatriz Lima', treinamento: 'NR-35 – Trabalho em Altura' },
  { id: 2, numero: 'CERT-2024-0002', dataEmissao: '2024-10-02', dataValidade: '2025-10-02', status: 'valido', funcionario: 'Carlos Eduardo Santos', treinamento: 'NR-35 – Trabalho em Altura' },
  { id: 3, numero: 'CERT-2024-0003', dataEmissao: '2024-09-17', dataValidade: '2025-09-17', status: 'valido', funcionario: 'Fernanda Oliveira', treinamento: 'CIPA – Comissão Interna de Prevenção' },
  { id: 4, numero: 'CERT-2024-0004', dataEmissao: '2024-08-22', dataValidade: '2025-08-22', status: 'valido', funcionario: 'Gabriel Mendes', treinamento: 'Primeiros Socorros e RCP' },
  { id: 5, numero: 'CERT-2023-0018', dataEmissao: '2023-11-01', dataValidade: '2024-11-01', status: 'vencido', funcionario: 'Helena Costa', treinamento: 'NR-35 – Trabalho em Altura' },
  { id: 6, numero: 'CERT-2024-0005', dataEmissao: '2024-09-17', dataValidade: '2025-09-17', status: 'valido', funcionario: 'Igor Fernandes', treinamento: 'CIPA – Comissão Interna de Prevenção' },
]

const mockUsuarios: Usuario[] = [
  { id: 1, email: 'admin@empresa.com', funcionario: 'Ana Beatriz Lima', ativo: true, criadoEm: '2023-01-10' },
  { id: 2, email: 'carlos.santos@empresa.com', funcionario: 'Carlos Eduardo Santos', ativo: true, criadoEm: '2023-03-22' },
  { id: 3, email: 'fernanda.oliveira@empresa.com', funcionario: 'Fernanda Oliveira', ativo: false, criadoEm: '2023-05-14' },
  { id: 4, email: 'gabriel.mendes@empresa.com', funcionario: 'Gabriel Mendes', ativo: true, criadoEm: '2024-01-08' },
]

const mockAuditorias: Auditoria[] = [
  { id: 1, entidade: 'Treinamento', acao: 'CREATE', usuario: 'admin@empresa.com', detalhe: 'Criou treinamento "NR-35 – Trabalho em Altura"', realizadoEm: '2024-09-20T08:14:32' },
  { id: 2, entidade: 'Certificado', acao: 'CREATE', usuario: 'admin@empresa.com', detalhe: 'Emitiu certificado CERT-2024-0001 para Ana Beatriz Lima', realizadoEm: '2024-10-02T11:03:17' },
  { id: 3, entidade: 'Funcionario', acao: 'UPDATE', usuario: 'carlos.santos@empresa.com', detalhe: 'Atualizou cargo de Igor Fernandes para Operador de Máquinas', realizadoEm: '2024-10-15T14:22:08' },
  { id: 4, entidade: 'Treinamento', acao: 'UPDATE', usuario: 'admin@empresa.com', detalhe: 'Alterou status de "Brigada de Incêndio" para em_andamento', realizadoEm: '2024-11-10T09:00:00' },
  { id: 5, entidade: 'Usuario', acao: 'UPDATE', usuario: 'admin@empresa.com', detalhe: 'Desativou usuário fernanda.oliveira@empresa.com', realizadoEm: '2024-11-18T16:45:55' },
  { id: 6, entidade: 'Instrutor', acao: 'CREATE', usuario: 'gabriel.mendes@empresa.com', detalhe: 'Cadastrou instrutor Marcos Vieira', realizadoEm: '2024-11-22T10:10:10' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusLabel: Record<string, { label: string; color: string }> = {
  concluido:    { label: 'Concluído',    color: 'text-emerald-400 bg-emerald-400/10' },
  em_andamento: { label: 'Em Andamento', color: 'text-amber-400 bg-amber-400/10' },
  planejado:    { label: 'Planejado',    color: 'text-sky-400 bg-sky-400/10' },
  valido:       { label: 'Válido',       color: 'text-emerald-400 bg-emerald-400/10' },
  vencido:      { label: 'Vencido',      color: 'text-red-400 bg-red-400/10' },
}

function Badge({ status }: { status: string }) {
  const s = statusLabel[status] ?? { label: status, color: 'text-gray-400 bg-gray-400/10' }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium ${s.color}`}>
      {s.label}
    </span>
  )
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR')
}

function formatDateTime(d: string) {
  return new Date(d).toLocaleString('pt-BR')
}

// ─── Components ───────────────────────────────────────────────────────────────

const navItems = [
  { id: 'dashboard',     label: 'Dashboard',    icon: '▦' },
  { id: 'treinamentos',  label: 'Treinamentos', icon: '◈' },
  { id: 'funcionarios',  label: 'Funcionários',  icon: '◉' },
  { id: 'instrutores',   label: 'Instrutores',   icon: '◎' },
  { id: 'certificados',  label: 'Certificados',  icon: '◇' },
  { id: 'usuarios',      label: 'Usuários',      icon: '○' },
  { id: 'auditoria',     label: 'Auditoria',     icon: '≡' },
]

function Sidebar({ page, onNav }: { page: Page; onNav: (p: Page) => void }) {
  return (
    <nav
      style={{ background: 'var(--card)', borderRight: '1px solid var(--border)' }}
      className="w-56 flex-shrink-0 flex flex-col h-screen sticky top-0"
    >
      {/* Logo */}
      <div className="px-5 py-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif' }} className="text-sm font-semibold tracking-widest uppercase" style2={{ color: 'var(--muted-foreground)' }}>
          <span style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>SYS</span>
          <span className="ml-2 text-xs tracking-widest" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Sans, sans-serif' }}>TREINAMENTOS</span>
        </div>
        <div className="mt-1 text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px' }}>
          v1.0 · 2024
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 py-4 px-3 overflow-y-auto">
        {navItems.map(item => {
          const active = page === item.id || (page === 'treinamento-detalhe' && item.id === 'treinamentos')
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id as Page)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm mb-0.5 transition-all duration-150 text-left"
              style={{
                background: active ? 'var(--primary)' : 'transparent',
                color: active ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: active ? 500 : 400,
              }}
            >
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', opacity: 0.7 }}>{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </div>

      {/* User */}
      <div className="px-4 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'var(--primary)' }}>A</div>
          <div>
            <div className="text-xs font-medium" style={{ color: 'var(--foreground)', fontFamily: 'DM Sans' }}>Admin</div>
            <div className="text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono', fontSize: '10px' }}>admin@empresa.com</div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--foreground)', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.02em' }}>
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)', fontFamily: 'Inter' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border ${className}`} style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      {children}
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider uppercase"
      style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace', borderBottom: '1px solid var(--border)' }}>
      {children}
    </th>
  )
}

function Td({ children, mono = false }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <td className="px-4 py-3 text-sm" style={{ color: 'var(--foreground)', fontFamily: mono ? 'JetBrains Mono, monospace' : 'Inter, sans-serif', borderBottom: '1px solid var(--border)' }}>
      {children}
    </td>
  )
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('admin@empresa.com')
  const [senha, setSenha] = useState('••••••••')

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="text-xs tracking-widest uppercase mb-2"
            style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace' }}>
            SYS · TREINAMENTOS
          </div>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '28px', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--foreground)' }}>
            Gestão de Treinamentos
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Acesse sua conta para continuar
          </p>
        </div>

        <Card className="p-7">
          <div className="mb-5">
            <label className="block text-xs mb-2 tracking-wide" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Sans' }}>
              E-MAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded text-sm outline-none transition-all"
              style={{
                background: 'var(--secondary)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                fontFamily: 'Inter',
              }}
            />
          </div>
          <div className="mb-6">
            <label className="block text-xs mb-2 tracking-wide" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Sans' }}>
              SENHA
            </label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              className="w-full px-3 py-2.5 rounded text-sm outline-none"
              style={{
                background: 'var(--secondary)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                fontFamily: 'Inter',
              }}
            />
          </div>
          <button
            onClick={onLogin}
            className="w-full py-2.5 rounded text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'DM Sans' }}
          >
            Entrar
          </button>
        </Card>

        <p className="text-center mt-6 text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
          © 2024 SYS Treinamentos
        </p>
      </div>
    </div>
  )
}

function DashboardPage() {
  const stats = [
    { label: 'Funcionários', value: 128, icon: '◉', delta: '+4 este mês' },
    { label: 'Treinamentos', value: 34, icon: '◈', delta: '6 em andamento' },
    { label: 'Instrutores', value: 12, icon: '◎', delta: '8 internos' },
    { label: 'Certificados', value: 217, icon: '◇', delta: '12 a vencer' },
  ]

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Visão geral do sistema de treinamentos" />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 mb-8" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {stats.map(s => (
          <Card key={s.label} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', color: 'var(--primary)' }}>{s.icon}</span>
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '36px', fontWeight: 600, color: 'var(--foreground)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {s.value}
            </div>
            <div className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Sans' }}>{s.label}</div>
            <div className="mt-2 text-xs" style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace' }}>{s.delta}</div>
          </Card>
        ))}
      </div>

      {/* Recent trainings */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <Card>
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold" style={{ fontFamily: 'DM Sans', color: 'var(--foreground)' }}>Treinamentos Recentes</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <Th>Título</Th>
                <Th>C/H</Th>
                <Th>Status</Th>
                <Th>Início</Th>
              </tr>
            </thead>
            <tbody>
              {mockTreinamentos.map(t => (
                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                  <Td><span className="font-medium">{t.titulo}</span></Td>
                  <Td mono>{t.cargaHoraria}h</Td>
                  <Td><Badge status={t.status} /></Td>
                  <Td mono>{formatDate(t.dataInicio)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold" style={{ fontFamily: 'DM Sans', color: 'var(--foreground)' }}>Certificados por Status</h2>
          </div>
          <div className="p-5 space-y-4">
            {[
              { label: 'Válidos',   value: 5, total: 6, color: '#34d399' },
              { label: 'Vencidos',  value: 1, total: 6, color: '#f87171' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs" style={{ color: 'var(--foreground)', fontFamily: 'DM Sans' }}>{item.label}</span>
                  <span className="text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono', fontSize: '11px' }}>{item.value}/{item.total}</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: '4px', background: 'var(--secondary)' }}>
                  <div style={{ width: `${(item.value / item.total) * 100}%`, height: '100%', background: item.color, borderRadius: '9999px' }} />
                </div>
              </div>
            ))}

            <div className="pt-4 mt-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <h3 className="text-xs font-medium mb-3 tracking-wider uppercase" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono', fontSize: '10px' }}>
                Setores Ativos
              </h3>
              {['Segurança do Trabalho', 'Produção', 'Qualidade', 'Recursos Humanos', 'Tecnologia'].map(s => (
                <div key={s} className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary)' }} />
                  <span className="text-xs" style={{ color: 'var(--secondary-foreground)', fontFamily: 'Inter' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function FuncionariosPage() {
  const [search, setSearch] = useState('')
  const filtered = mockFuncionarios.filter(f =>
    f.nome.toLowerCase().includes(search.toLowerCase()) ||
    f.setor.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <PageHeader
        title="Funcionários"
        subtitle={`${mockFuncionarios.length} funcionários cadastrados`}
        action={
          <button className="px-4 py-2 rounded text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'DM Sans' }}>
            + Novo Funcionário
          </button>
        }
      />
      <Card>
        <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <input
            placeholder="Buscar por nome ou setor…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-64 px-3 py-1.5 rounded text-sm outline-none"
            style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)', fontFamily: 'Inter' }}
          />
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <Th>Matrícula</Th>
              <Th>Nome</Th>
              <Th>Cargo</Th>
              <Th>Setor</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id} className="hover:bg-white/[0.02] transition-colors">
                <Td mono>{f.matricula}</Td>
                <Td><span className="font-medium">{f.nome}</span></Td>
                <Td>{f.cargo}</Td>
                <Td><span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--secondary)', color: 'var(--secondary-foreground)', fontFamily: 'JetBrains Mono' }}>{f.setor}</span></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function InstrutoresPage() {
  return (
    <div>
      <PageHeader
        title="Instrutores"
        subtitle={`${mockInstrutores.length} instrutores cadastrados`}
        action={
          <button className="px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'DM Sans' }}>
            + Novo Instrutor
          </button>
        }
      />
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {mockInstrutores.map(i => (
          <Card key={i.id} className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: i.interno ? 'var(--primary)' : 'var(--secondary)', color: i.interno ? 'white' : 'var(--secondary-foreground)' }}>
                {i.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate" style={{ color: 'var(--foreground)', fontFamily: 'DM Sans' }}>{i.nome}</div>
                <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--muted-foreground)', fontFamily: 'Inter' }}>{i.especialidade}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${i.interno ? 'text-emerald-400 bg-emerald-400/10' : 'text-sky-400 bg-sky-400/10'}`}
                style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {i.interno ? 'Interno' : 'Externo'}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t space-y-2" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: 'var(--primary)' }}>REG</span>
                <span style={{ fontFamily: 'JetBrains Mono' }}>{i.registro}</span>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: 'var(--primary)' }}>@</span>
                <span className="truncate" style={{ fontFamily: 'Inter' }}>{i.email}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TreinamentosPage({ onView }: { onView: (t: Treinamento) => void }) {
  const [filter, setFilter] = useState('todos')
  const filtered = filter === 'todos' ? mockTreinamentos : mockTreinamentos.filter(t => t.status === filter)

  return (
    <div>
      <PageHeader
        title="Treinamentos"
        subtitle={`${mockTreinamentos.length} treinamentos no sistema`}
        action={
          <button className="px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'DM Sans' }}>
            + Novo Treinamento
          </button>
        }
      />

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6">
        {[['todos', 'Todos'], ['concluido', 'Concluídos'], ['em_andamento', 'Em Andamento'], ['planejado', 'Planejados']].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className="px-4 py-1.5 rounded text-xs font-medium transition-all"
            style={{
              background: filter === k ? 'var(--primary)' : 'var(--secondary)',
              color: filter === k ? 'white' : 'var(--secondary-foreground)',
              fontFamily: 'DM Sans',
            }}
          >
            {l}
          </button>
        ))}
      </div>

      <Card>
        <table className="w-full">
          <thead>
            <tr>
              <Th>Título</Th>
              <Th>Carga Horária</Th>
              <Th>Status</Th>
              <Th>Início</Th>
              <Th>Fim</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                <Td>
                  <div>
                    <div className="font-medium">{t.titulo}</div>
                    <div className="text-xs mt-0.5 truncate max-w-xs" style={{ color: 'var(--muted-foreground)' }}>{t.descricao}</div>
                  </div>
                </Td>
                <Td mono>{t.cargaHoraria}h</Td>
                <Td><Badge status={t.status} /></Td>
                <Td mono>{formatDate(t.dataInicio)}</Td>
                <Td mono>{formatDate(t.dataFim)}</Td>
                <Td>
                  <button
                    onClick={() => onView(t)}
                    className="text-xs px-3 py-1 rounded hover:opacity-90 transition-opacity"
                    style={{ background: 'var(--secondary)', color: 'var(--primary)', fontFamily: 'DM Sans' }}
                  >
                    Ver
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function TreinamentoDetalhePage({ treinamento, onBack }: { treinamento: Treinamento; onBack: () => void }) {
  const participantes = mockFuncionarios.slice(0, 4)
  const instrutores = mockInstrutores.slice(0, 2)

  return (
    <div>
      <div className="mb-6">
        <button onClick={onBack} className="text-xs mb-4 flex items-center gap-1 hover:opacity-80 transition-opacity"
          style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace' }}>
          ← Voltar para Treinamentos
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--foreground)' }}>
              {treinamento.titulo}
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>{treinamento.descricao}</p>
          </div>
          <Badge status={treinamento.status} />
        </div>
      </div>

      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Carga Horária', value: `${treinamento.cargaHoraria}h` },
          { label: 'Data de Início', value: formatDate(treinamento.dataInicio) },
          { label: 'Data de Fim', value: formatDate(treinamento.dataFim) },
          { label: 'Participantes', value: participantes.length },
        ].map(m => (
          <Card key={m.label} className="p-4">
            <div className="text-xs mb-1" style={{ color: 'var(--muted-foreground)', fontFamily: 'DM Sans' }}>{m.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '20px', color: 'var(--foreground)', fontWeight: 500 }}>{m.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <Card>
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold" style={{ fontFamily: 'DM Sans', color: 'var(--foreground)' }}>Participantes</h2>
          </div>
          <div className="p-4 space-y-2">
            {participantes.map(p => (
              <div key={p.id} className="flex items-center gap-3 px-2 py-2 rounded" style={{ background: 'var(--secondary)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'var(--primary)', color: 'white' }}>
                  {p.nome[0]}
                </div>
                <div>
                  <div className="text-xs font-medium" style={{ color: 'var(--foreground)', fontFamily: 'DM Sans' }}>{p.nome}</div>
                  <div className="text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono', fontSize: '10px' }}>{p.matricula} · {p.cargo}</div>
                </div>
                <div className="ml-auto">
                  <span className="text-xs px-2 py-0.5 rounded text-emerald-400 bg-emerald-400/10" style={{ fontFamily: 'JetBrains Mono', fontSize: '10px' }}>
                    inscrito
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold" style={{ fontFamily: 'DM Sans', color: 'var(--foreground)' }}>Instrutores</h2>
          </div>
          <div className="p-4 space-y-2">
            {instrutores.map(i => (
              <div key={i.id} className="flex items-center gap-3 px-2 py-2 rounded" style={{ background: 'var(--secondary)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: i.interno ? 'var(--primary)' : 'var(--muted)', color: i.interno ? 'white' : 'var(--secondary-foreground)' }}>
                  {i.nome.split(' ').slice(-1)[0][0]}
                </div>
                <div>
                  <div className="text-xs font-medium" style={{ color: 'var(--foreground)', fontFamily: 'DM Sans' }}>{i.nome}</div>
                  <div className="text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'Inter', fontSize: '11px' }}>{i.especialidade}</div>
                </div>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded ${i.interno ? 'text-emerald-400 bg-emerald-400/10' : 'text-sky-400 bg-sky-400/10'}`}
                  style={{ fontFamily: 'JetBrains Mono', fontSize: '10px' }}>
                  {i.interno ? 'interno' : 'externo'}
                </span>
              </div>
            ))}
          </div>

          <div className="px-5 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold mb-3" style={{ fontFamily: 'DM Sans', color: 'var(--foreground)' }}>Evidências</h2>
            {[
              { tipo: 'Lista de Presença', arquivo: 'presenca_nr35_out24.pdf' },
              { tipo: 'Avaliação de Reação', arquivo: 'avaliacao_nr35_out24.xlsx' },
            ].map(e => (
              <div key={e.arquivo} className="flex items-center gap-3 mb-2">
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--primary)' }}>↓</span>
                <div>
                  <div className="text-xs font-medium" style={{ color: 'var(--foreground)', fontFamily: 'DM Sans' }}>{e.tipo}</div>
                  <div className="text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono', fontSize: '10px' }}>{e.arquivo}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function CertificadosPage() {
  return (
    <div>
      <PageHeader
        title="Certificados"
        subtitle={`${mockCertificados.length} certificados emitidos`}
      />
      <Card>
        <table className="w-full">
          <thead>
            <tr>
              <Th>Número</Th>
              <Th>Funcionário</Th>
              <Th>Treinamento</Th>
              <Th>Emissão</Th>
              <Th>Validade</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {mockCertificados.map(c => (
              <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                <Td mono>{c.numero}</Td>
                <Td><span className="font-medium">{c.funcionario}</span></Td>
                <Td><span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{c.treinamento}</span></Td>
                <Td mono>{formatDate(c.dataEmissao)}</Td>
                <Td mono>{formatDate(c.dataValidade)}</Td>
                <Td><Badge status={c.status} /></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function UsuariosPage() {
  return (
    <div>
      <PageHeader
        title="Usuários"
        subtitle={`${mockUsuarios.length} usuários no sistema`}
        action={
          <button className="px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'DM Sans' }}>
            + Novo Usuário
          </button>
        }
      />
      <Card>
        <table className="w-full">
          <thead>
            <tr>
              <Th>E-mail</Th>
              <Th>Funcionário</Th>
              <Th>Criado em</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {mockUsuarios.map(u => (
              <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                <Td mono>{u.email}</Td>
                <Td><span className="font-medium">{u.funcionario}</span></Td>
                <Td mono>{formatDate(u.criadoEm)}</Td>
                <Td>
                  <span className={`text-xs px-2 py-0.5 rounded font-mono ${u.ativo ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
                    {u.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function AuditoriaPage() {
  const acaoColor: Record<string, string> = {
    CREATE: 'text-emerald-400',
    UPDATE: 'text-amber-400',
    DELETE: 'text-red-400',
  }

  return (
    <div>
      <PageHeader
        title="Auditoria"
        subtitle="Registro de ações realizadas no sistema"
      />
      <Card>
        <table className="w-full">
          <thead>
            <tr>
              <Th>Data/Hora</Th>
              <Th>Entidade</Th>
              <Th>Ação</Th>
              <Th>Usuário</Th>
              <Th>Detalhe</Th>
            </tr>
          </thead>
          <tbody>
            {mockAuditorias.map(a => (
              <tr key={a.id} className="hover:bg-white/[0.02] transition-colors">
                <Td mono><span className="text-xs">{formatDateTime(a.realizadoEm)}</span></Td>
                <Td><span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--secondary)', color: 'var(--secondary-foreground)', fontFamily: 'JetBrains Mono' }}>{a.entidade}</span></Td>
                <Td><span className={`text-xs font-mono font-bold ${acaoColor[a.acao] ?? 'text-gray-400'}`}>{a.acao}</span></Td>
                <Td mono><span className="text-xs">{a.usuario}</span></Td>
                <Td><span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{a.detalhe}</span></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>('login')
  const [selectedTreinamento, setSelectedTreinamento] = useState<Treinamento | null>(null)

  if (page === 'login') {
    return <LoginPage onLogin={() => setPage('dashboard')} />
  }

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--background)' }}>
      <Sidebar page={page} onNav={p => { setPage(p); setSelectedTreinamento(null) }} />
      <main className="flex-1 overflow-y-auto p-8 min-w-0">
        {page === 'dashboard'           && <DashboardPage />}
        {page === 'funcionarios'        && <FuncionariosPage />}
        {page === 'instrutores'         && <InstrutoresPage />}
        {page === 'treinamentos'        && (
          <TreinamentosPage onView={t => { setSelectedTreinamento(t); setPage('treinamento-detalhe') }} />
        )}
        {page === 'treinamento-detalhe' && selectedTreinamento && (
          <TreinamentoDetalhePage treinamento={selectedTreinamento} onBack={() => setPage('treinamentos')} />
        )}
        {page === 'certificados'        && <CertificadosPage />}
        {page === 'usuarios'            && <UsuariosPage />}
        {page === 'auditoria'           && <AuditoriaPage />}
      </main>
    </div>
  )
}
