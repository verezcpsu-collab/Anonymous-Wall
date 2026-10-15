
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Feather, Heart, LockKeyhole } from 'lucide-react';

export default function Login({ status, canResetPassword = true }) {
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        form.post(route('login'));
    };

    return (
        <>
            <Head title="Log in | Whisper Wall" />

            <main className="flex min-h-screen bg-white">
                <section className="relative hidden overflow-hidden bg-blue-600 px-12 py-12 text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-between xl:px-20">
                    <div className="pointer-events-none absolute -right-24 top-20 h-96 w-96 rounded-full border-[65px] border-white/10" />
                    <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-500/70 blur-3xl" />

                    <Link href="/" className="relative flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-700">
                            <Feather size={24} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            Whisper Wall
                        </span>
                    </Link>

                    <div className="relative max-w-xl">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                            <Heart size={27} />
                        </div>

                        <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight xl:text-6xl">
                            You deserve a space where you can be yourself.
                        </h1>

                        <p className="mt-6 max-w-lg text-base leading-8 text-blue-100">
                            Come as you are. Whether you need to share something,
                            read someone else's story, or simply take a breath,
                            there's room for you here.
                        </p>

                        <div className="mt-9 flex items-center gap-3 text-sm text-blue-100">
                            <LockKeyhole size={18} />
                            <span>Your account stays separate from your public confessions.</span>
                        </div>
                    </div>

                    <p className="relative text-sm text-blue-100">
                        No pressure to be perfect. Just room to be human.
                    </p>
                </section>

                <section className="flex w-full items-center justify-center px-5 py-12 sm:px-10 lg:w-1/2">
                    <div className="w-full max-w-md">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
                        >
                            <ArrowLeft size={16} />
                            Back to home
                        </Link>

                        <div className="mt-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 lg:hidden">
                            <Feather size={25} />
                        </div>

                        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                            Welcome back
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                            Log in to your space.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Pick up where you left off. Your space is waiting for you.
                        </p>

                        {status && (
                            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                                {status}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="username"
                                    autoFocus
                                    required
                                    value={form.data.email}
                                    onChange={(event) => form.setData('email', event.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                                {form.errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{form.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <label htmlFor="password" className="block text-sm font-semibold text-slate-800">
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs font-semibold text-blue-600 transition hover:text-blue-800"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    value={form.data.password}
                                    onChange={(event) => form.setData('password', event.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                                {form.errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{form.errors.password}</p>
                                )}
                            </div>

                            <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={form.data.remember}
                                    onChange={(event) => form.setData('remember', event.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                Remember me
                            </label>

                            {form.errors.email && form.errors.password && (
                                <p className="text-sm text-red-600">
                                    Please check your login details and try again.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {form.processing ? 'Logging in...' : 'Log in'}
                                {!form.processing && <ArrowRight size={17} />}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-slate-500">
                            New to Whisper Wall?{' '}
                            <Link
                                href={route('register')}
                                className="font-semibold text-blue-600 transition hover:text-blue-800"
                            >
                                Create an account
                            </Link>
                        </p>

                        <div className="mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <LockKeyhole size={18} className="mt-0.5 shrink-0 text-blue-600" />
                            <p className="text-xs leading-6 text-slate-500">
                                Your login identifies your account. Your account name
                                should not be displayed on your public confessions.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
