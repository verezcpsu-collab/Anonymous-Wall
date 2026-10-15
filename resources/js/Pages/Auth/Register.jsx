
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Feather, Heart, LockKeyhole } from 'lucide-react';

export default function Register() {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        form.post(route('register'));
    };

    return (
        <>
            <Head title="Create account | Whisper Wall" />

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
                            A new space. A fresh start.
                        </h1>

                        <p className="mt-6 max-w-lg text-base leading-8 text-blue-100">
                            You don't need perfect words or a perfect day. Create
                            your account and make room for honest expression,
                            reflection, and kinder conversations.
                        </p>

                        <div className="mt-9 flex items-center gap-3 text-sm text-blue-100">
                            <LockKeyhole size={18} />
                            <span>Your profile details won't appear on public confessions.</span>
                        </div>
                    </div>

                    <p className="relative text-sm text-blue-100">
                        Take your time. Share what feels comfortable.
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

                        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 lg:hidden">
                            <Feather size={25} />
                        </div>

                        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                            Join the community
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                            Find your space.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Create your account to share your thoughts and explore
                            the community.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-800">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    required
                                    maxLength={255}
                                    value={form.data.name}
                                    onChange={(event) => form.setData('name', event.target.value)}
                                    placeholder="Your name"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                                {form.errors.name && (
                                    <p className="mt-2 text-sm text-red-600">{form.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="username"
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
                                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-800">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    required
                                    value={form.data.password}
                                    onChange={(event) => form.setData('password', event.target.value)}
                                    placeholder="Create a password"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                                {form.errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{form.errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="mb-2 block text-sm font-semibold text-slate-800">
                                    Confirm password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    required
                                    value={form.data.password_confirmation}
                                    onChange={(event) => form.setData('password_confirmation', event.target.value)}
                                    placeholder="Enter your password again"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                                {form.errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {form.errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {form.processing ? 'Creating account...' : 'Create account'}
                                {!form.processing && <ArrowRight size={17} />}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link
                                href={route('login')}
                                className="font-semibold text-blue-600 transition hover:text-blue-800"
                            >
                                Log in
                            </Link>
                        </p>

                        <div className="mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <LockKeyhole size={18} className="mt-0.5 shrink-0 text-blue-600" />
                            <p className="text-xs leading-6 text-slate-500">
                                Your name is used for your account, not to identify
                                you publicly on your confessions. Avoid including
                                identifying details in the posts themselves.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
