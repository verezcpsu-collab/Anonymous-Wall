
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Feather,
    Heart,
    LockKeyhole,
    ShieldCheck,
    Sprout,
    Moon,
    Menu,
    X,
} from 'lucide-react';
import { useState } from 'react';

export default function Welcome() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Head title="Whisper Wall | A Place to Be Yourself" />

            <div className="min-h-screen overflow-hidden bg-white text-slate-950">
                <header className="relative z-20 border-b border-blue-100/70 bg-white">
                    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                <Feather size={21} />
                            </div>
                            <div>
                                <span className="block text-lg font-bold tracking-tight">
                                    Whisper Wall
                                </span>
                                <span className="block text-[11px] tracking-wide text-slate-500">
                                    A place to let it out
                                </span>
                            </div>
                        </Link>

                        <nav className="hidden items-center gap-8 md:flex">
                            <a
                                href="#welcome"
                                className="text-sm text-slate-600 transition hover:text-blue-600"
                            >
                                Home
                            </a>
                            <a
                                href="#safe-space"
                                className="text-sm text-slate-600 transition hover:text-blue-600"
                            >
                                Our safe space
                            </a>
                        </nav>

                        <div className="hidden items-center gap-3 md:flex">
                            <Link
                                href={route('login')}
                                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Find your space
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            className="rounded-xl p-2 text-slate-700 transition hover:bg-blue-50 md:hidden"
                        >
                            {menuOpen ? <X size={23} /> : <Menu size={23} />}
                        </button>
                    </div>

                    {menuOpen && (
                        <div className="border-t border-blue-100 bg-white px-5 py-5 md:hidden">
                            <nav className="flex flex-col gap-4">
                                <a
                                    href="#welcome"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Home
                                </a>
                                <a
                                    href="#safe-space"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Our safe space
                                </a>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white"
                                >
                                    Find your space
                                </Link>
                            </nav>
                        </div>
                    )}
                </header>

                <main>
                    <section
                        id="welcome"
                        className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white"
                    >
                        <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-28 -left-24 -z-10 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />

                        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-28">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm text-blue-700 shadow-sm">
                                    <Heart size={15} className="fill-blue-100" />
                                    A little kindness goes a long way
                                </div>

                                <h1 className="mt-7 max-w-2xl text-5xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-6xl lg:text-[68px]">
                                    You don't have to
                                    <span className="mt-1 block text-blue-600">
                                        have it all together.
                                    </span>
                                </h1>

                                <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                                    Some feelings are difficult to explain. Some days,
                                    you just need to let things out. Whisper Wall is a
                                    space to share what's on your mind, read other
                                    people's experiences, and remember that you don't
                                    have to figure everything out at once.
                                </p>

                                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
                                    >
                                        Let it out
                                        <ArrowRight size={18} />
                                    </Link>

                                    <a
                                        href="#safe-space"
                                        className="inline-flex min-h-13 items-center justify-center rounded-xl border border-blue-100 bg-white px-6 py-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
                                    >
                                        Get to know this space
                                    </a>
                                </div>

                                <p className="mt-6 flex items-center gap-2 text-sm leading-6 text-slate-500">
                                    <LockKeyhole size={15} className="shrink-0 text-blue-600" />
                                    Your public posts won't display your account name.
                                </p>
                            </div>

                            <div className="relative mx-auto w-full max-w-md">
                                <div className="absolute inset-5 rounded-full bg-blue-200/40 blur-3xl" />

                                <div className="relative rounded-[32px] border border-blue-100 bg-white/90 p-7 shadow-2xl shadow-blue-950/5 sm:p-9">
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                            <Sprout size={26} />
                                        </div>
                                        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                                            Take your time
                                        </span>
                                    </div>

                                    <p className="mt-9 text-sm font-medium text-blue-600">
                                        A gentle reminder
                                    </p>

                                    <h2 className="mt-3 text-3xl font-semibold leading-snug tracking-tight text-slate-950 sm:text-4xl">
                                        You are allowed to feel what you feel.
                                    </h2>

                                    <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                                        You don't need the perfect words. You don't
                                        have to explain everything. Start wherever
                                        you are, and give yourself permission to be
                                        honest.
                                    </p>

                                    <div className="my-7 h-px bg-blue-100" />

                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                            <Moon size={19} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                One step at a time.
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                                You deserve patience, even from yourself.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-7 rounded-2xl bg-slate-950 p-5">
                                        <div className="flex items-start gap-3">
                                            <Heart size={20} className="mt-0.5 shrink-0 text-blue-300" />
                                            <p className="text-sm leading-6 text-slate-300">
                                                This is a space for honest expression,
                                                mutual respect, and a little more
                                                understanding.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-lg sm:flex">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                        <ShieldCheck size={21} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">
                                            Respect comes first
                                        </p>
                                        <p className="mt-0.5 text-xs text-slate-500">
                                            Every voice deserves kindness
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        id="safe-space"
                        className="border-t border-blue-100 bg-white"
                    >
                        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
                            <div className="mx-auto max-w-2xl text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                    <ShieldCheck size={28} />
                                </div>

                                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                                    What we believe in
                                </p>

                                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                                    A space where you can be yourself.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-600">
                                    Everyone carries something different. We want
                                    Whisper Wall to be a community where people can
                                    express themselves without being mocked, shamed,
                                    or made to feel small.
                                </p>
                            </div>

                            <div className="mt-14 grid gap-5 md:grid-cols-3">
                                <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-7">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                                        <LockKeyhole size={23} />
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold text-slate-950">
                                        Your identity is yours
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        Your account helps protect ownership of your
                                        posts, but your public confessions won't show
                                        your real name or account identity.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-7">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <Heart size={23} />
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold text-slate-950">
                                        Kindness over judgment
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        Every person has a story. Treat other people's
                                        experiences with care, and remember that you
                                        never know the whole picture.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-7">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <Sprout size={23} />
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold text-slate-950">
                                        Your story, your pace
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        Share only what you're comfortable sharing.
                                        You decide what to write and when you're
                                        ready to put it into words.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 rounded-3xl bg-slate-950 px-6 py-9 text-center sm:px-10 sm:py-12">
                                <p className="text-sm font-medium text-blue-300">
                                    Before you share
                                </p>
                                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                    You deserve to be heard and treated with respect.
                                </h3>
                                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                                    Please protect your personal information and respect
                                    the privacy of others. Anonymous posting can make
                                    sharing easier, but it cannot guarantee complete
                                    secrecy or replace professional support when you
                                    need it.
                                </p>
                                <Link
                                    href={route('register')}
                                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                                >
                                    Find your space
                                    <ArrowRight size={17} />
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-blue-100 bg-blue-50/50">
                    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                                <Feather size={19} />
                            </div>
                            <span className="font-bold tracking-tight text-slate-950">
                                Whisper Wall
                            </span>
                        </Link>

                        <p className="max-w-md text-sm leading-6 text-slate-500 md:text-center">
                            No pressure to be perfect. Just room to be human.
                        </p>

                        <p className="text-xs text-slate-500">
                            © {new Date().getFullYear()} Whisper Wall
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
