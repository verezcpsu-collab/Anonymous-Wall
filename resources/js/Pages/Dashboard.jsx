
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    Feather,
    FileText,
    Heart,
    House,
    LogOut,
    Menu,
    MessageCircle,
    ShieldCheck,
    Users,
    X,
    Clock,
} from 'lucide-react';
import { useState } from 'react';

export default function Dashboard({
    myConfessionsCount = 0,
    communityConfessionsCount = 0,
    recentConfessions = [],
}) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [menuOpen, setMenuOpen] = useState(false);
    const { post, processing } = useForm({});

    const firstName = user?.name?.trim()?.split(/\s+/)[0] || 'there';

    const handleLogout = (event) => {
        event.preventDefault();
        post(route('logout'));
    };

    const navigation = [
        { label: 'Dashboard', href: '/dashboard', icon: House, active: true },
        { label: 'Confession Wall', href: '/confessions', icon: Users, active: false },
        { label: 'My Confessions', href: '/my-confessions', icon: FileText, active: false },
    ];

    const formatDate = (date) => {
        if (!date) return 'Recently';

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) return 'Recently';

        return parsedDate.toLocaleDateString('en-PH', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <>
            <Head title="Dashboard | Whisper Wall" />

            <div className="min-h-screen bg-slate-50 text-slate-950">
                <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
                    <Link href="/" className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <Feather size={22} />
                        </div>
                        <div>
                            <span className="block font-bold tracking-tight">Whisper Wall</span>
                            <span className="mt-0.5 block text-xs text-slate-500">
                                Your space, your words.
                            </span>
                        </div>
                    </Link>

                    <div className="px-4 pt-8">
                        <p className="px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            Workspace
                        </p>

                        <nav className="mt-4 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                                            item.active
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-blue-700'
                                        }`}
                                    >
                                        <Icon size={19} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="mt-auto p-4">
                        <div className="rounded-2xl bg-slate-950 p-5 text-white">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                                <ShieldCheck size={22} />
                            </div>
                            <h3 className="mt-4 font-semibold">A space for everyone</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-300">
                                Take your time. Share only what feels comfortable.
                            </p>
                        </div>

                        <form onSubmit={handleLogout} className="mt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 disabled:opacity-50"
                            >
                                <LogOut size={18} />
                                {processing ? 'Logging out...' : 'Log out'}
                            </button>
                        </form>
                    </div>
                </aside>

                <div className="lg:pl-64">
                    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
                        <div className="flex h-[72px] items-center justify-between px-5 sm:px-8 lg:px-10">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                                    className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
                                >
                                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                                </button>

                                <div>
                                    <p className="text-xs font-medium text-slate-500">Workspace</p>
                                    <h1 className="mt-0.5 font-bold tracking-tight">Dashboard</h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="hidden text-right sm:block">
                                    <p className="text-sm font-semibold text-slate-900">{firstName}</p>
                                    <p className="text-xs text-slate-500">My account</p>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-sm font-bold text-blue-700">
                                    {firstName.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>

                        {menuOpen && (
                            <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
                                <nav className="space-y-1">
                                    {navigation.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setMenuOpen(false)}
                                                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
                                                    item.active
                                                        ? 'bg-blue-50 text-blue-700'
                                                        : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                            >
                                                <Icon size={19} />
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                    <form onSubmit={handleLogout}>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                                        >
                                            <LogOut size={19} />
                                            Log out
                                        </button>
                                    </form>
                                </nav>
                            </div>
                        )}
                    </header>

                    <main className="mx-auto max-w-[1500px] space-y-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                        <section className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-8 text-white sm:px-9 sm:py-10">
                            <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border-[45px] border-white/10" />

                            <div className="relative max-w-2xl">
                                <p className="flex items-center gap-2 text-sm font-medium text-blue-100">
                                    <Heart size={17} />
                                    Your personal space
                                </p>

                                <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                                    Welcome back, {firstName}.
                                </h2>

                                <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                                    Whatever is on your mind today, you deserve a space
                                    where you can express yourself at your own pace.
                                </p>

                                <Link
                                    href="/confessions"
                                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                                >
                                    Write a confession
                                    <ArrowRight size={17} />
                                </Link>
                            </div>
                        </section>

                        <section>
                            <div className="mb-5">
                                <h2 className="text-lg font-bold tracking-tight">Your overview</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    A live summary of Whisper Wall activity.
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                <article className="rounded-2xl border border-slate-200 bg-white p-6">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                        <FileText size={22} />
                                    </div>
                                    <p className="mt-5 text-sm font-medium text-slate-500">My confessions</p>
                                    <h3 className="mt-1 text-3xl font-bold">{myConfessionsCount}</h3>
                                    <Link href="/my-confessions" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800">
                                        View my posts <ArrowRight size={14} />
                                    </Link>
                                </article>

                                <article className="rounded-2xl border border-slate-200 bg-white p-6">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                        <MessageCircle size={22} />
                                    </div>
                                    <p className="mt-5 text-sm font-medium text-slate-500">Community confessions</p>
                                    <h3 className="mt-1 text-3xl font-bold">{communityConfessionsCount}</h3>
                                    <Link href="/confessions" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800">
                                        Explore the wall <ArrowRight size={14} />
                                    </Link>
                                </article>

                                <article className="rounded-2xl border border-slate-200 bg-white p-6">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                        <ShieldCheck size={22} />
                                    </div>
                                    <p className="mt-5 text-sm font-medium text-slate-500">Your privacy</p>
                                    <h3 className="mt-1 text-xl font-bold">Your space</h3>
                                    <p className="mt-2 text-xs leading-5 text-slate-400">
                                        Your account identity should stay out of public posts.
                                    </p>
                                </article>
                            </div>
                        </section>

                        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                        <BarChart3 size={22} />
                                    </div>
                                    <div>
                                        <h2 className="font-bold tracking-tight">Recent activity</h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Your latest confessions.
                                        </p>
                                    </div>
                                </div>

                                {recentConfessions.length > 0 ? (
                                    <div className="mt-6 space-y-4">
                                        {recentConfessions.map((confession) => (
                                            <article key={confession.id} className="rounded-xl border border-slate-100 p-4">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                                                        {confession.category}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                                                        <Clock size={13} />
                                                        {formatDate(confession.created_at)}
                                                    </span>
                                                </div>
                                                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                                                    {confession.content}
                                                </p>
                                            </article>
                                        ))}

                                        <Link href="/my-confessions" className="inline-flex items-center gap-2 pt-1 text-sm font-semibold text-blue-600 hover:text-blue-800">
                                            See all my confessions
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                                            <Feather size={25} />
                                        </div>
                                        <h3 className="mt-4 font-semibold text-slate-800">No confessions yet</h3>
                                        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                            Your saved confessions will appear here after you share them.
                                        </p>
                                        <Link href="/confessions" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                                            Write a confession <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                                    <Heart size={23} />
                                </div>

                                <h2 className="mt-6 text-xl font-bold">A reminder for today</h2>

                                <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">
                                    You do not need to have everything figured out.
                                    Take a breath, give yourself some patience, and
                                    remember that your feelings deserve care.
                                </p>

                                <div className="mt-7 border-t border-white/10 pt-5">
                                    <p className="text-xs leading-6 text-slate-400">
                                        Share only what you feel comfortable sharing.
                                        Avoid including personal information in public posts.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}

function formatDate(date) {
    if (!date) return 'Recently';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return 'Recently';

    return parsedDate.toLocaleDateString('en-PH', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}
