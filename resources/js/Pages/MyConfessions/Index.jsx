
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Feather,
    FileText,
    Heart,
    House,
    LockKeyhole,
    LogOut,
    Menu,
    Pencil,
    Plus,
    Search,
    ShieldCheck,
    Trash2,
    Users,
    X,
} from 'lucide-react';
import { useMemo, useState } from 'react';

const categories = [
    'All',
    'Life',
    'School',
    'Family',
    'Relationships',
    'Mental Health',
    'Other',
];

const postCategories = categories.filter((category) => category !== 'All');

export default function Index({ confessions = [] }) {
    const { props } = usePage();
    const firstName = props.auth?.user?.name?.trim()?.split(/\s+/)[0] || 'there';
    const successMessage = props.flash?.success;

    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [menuOpen, setMenuOpen] = useState(false);
    const [composerOpen, setComposerOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const form = useForm({
        category: 'Life',
        content: '',
    });

    const logoutForm = useForm({});

    const filteredPosts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return confessions.filter((item) => {
            const matchesCategory =
                activeCategory === 'All' || item.category === activeCategory;

            const matchesSearch =
                !query ||
                item.content?.toLowerCase().includes(query) ||
                item.category?.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [confessions, search, activeCategory]);

    const openCreateForm = () => {
        setEditingPost(null);
        form.clearErrors();
        form.setData({ category: 'Life', content: '' });
        setComposerOpen(true);
    };

    const openEditForm = (item) => {
        setEditingPost(item);
        form.clearErrors();
        form.setData({
            category: item.category,
            content: item.content,
        });
        setComposerOpen(true);
    };

    const closeForm = () => {
        setComposerOpen(false);
        setEditingPost(null);
        form.clearErrors();
        form.setData({ category: 'Life', content: '' });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => closeForm(),
        };

        if (editingPost) {
            form.put(route('confessions.update', editingPost.id), options);
        } else {
            form.post(route('confessions.store'), options);
        }
    };

    const handleDelete = () => {
        if (deleteTarget === null) return;

        router.delete(route('confessions.destroy', deleteTarget), {
            preserveScroll: true,
            onSuccess: () => setDeleteTarget(null),
            onError: () => setDeleteTarget(null),
        });
    };

    const handleLogout = (event) => {
        event.preventDefault();
        logoutForm.post(route('logout'));
    };

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

    const navigation = [
        { label: 'Dashboard', href: '/dashboard', icon: House },
        { label: 'Confession Wall', href: '/confessions', icon: Users },
        { label: 'My Confessions', href: '/my-confessions', icon: FileText },
    ];

    return (
        <>
            <Head title="My Confessions | Whisper Wall" />

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
                                const active = item.label === 'My Confessions';

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                                            active
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
                            <h3 className="mt-4 font-semibold">Your words, your control</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-300">
                                Manage your own confessions in one place.
                            </p>
                        </div>

                        <form onSubmit={handleLogout} className="mt-4">
                            <button
                                type="submit"
                                disabled={logoutForm.processing}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                            >
                                <LogOut size={18} />
                                {logoutForm.processing ? 'Logging out...' : 'Log out'}
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
                                    <p className="text-xs font-medium text-slate-500">Your personal space</p>
                                    <h1 className="mt-0.5 font-bold tracking-tight">My Confessions</h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="hidden text-sm font-medium text-slate-600 sm:block">
                                    {firstName}
                                </span>
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
                                        const active = item.label === 'My Confessions';

                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setMenuOpen(false)}
                                                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
                                                    active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
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
                                            disabled={logoutForm.processing}
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
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50">
                                    <LockKeyhole size={14} />
                                    Your personal collection
                                </div>

                                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                                    Your words, {firstName}.
                                </h2>

                                <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                                    Find your saved confessions here. Update your thoughts or
                                    remove a post whenever you need to.
                                </p>

                                <button
                                    type="button"
                                    onClick={openCreateForm}
                                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                                >
                                    <Plus size={17} />
                                    Write a confession
                                </button>
                            </div>
                        </section>

                        {successMessage && (
                            <div role="status" className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {successMessage}
                            </div>
                        )}

                        <section>
                            <div className="mb-5">
                                <h2 className="text-lg font-bold tracking-tight">Your overview</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    A summary of your own saved confessions.
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <article className="rounded-2xl border border-slate-200 bg-white p-6">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                        <FileText size={22} />
                                    </div>
                                    <p className="mt-5 text-sm font-medium text-slate-500">Total confessions</p>
                                    <p className="mt-1 text-3xl font-bold">{confessions.length}</p>
                                    <p className="mt-2 text-xs text-slate-400">Saved to your account.</p>
                                </article>

                                <article className="rounded-2xl border border-slate-200 bg-white p-6">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                        <Heart size={22} />
                                    </div>
                                    <p className="mt-5 text-sm font-medium text-slate-500">A little reminder</p>
                                    <p className="mt-2 text-base font-bold">Your feelings matter.</p>
                                    <p className="mt-2 text-xs leading-5 text-slate-400">
                                        You can express yourself at your own pace.
                                    </p>
                                </article>
                            </div>
                        </section>

                        <section>
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">All my confessions</h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Only your own saved posts appear here.
                                    </p>
                                </div>

                                <div className="relative w-full lg:max-w-sm">
                                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="search"
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search your confessions..."
                                        aria-label="Search your confessions"
                                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
                                {categories.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setActiveCategory(item)}
                                        className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                                            activeCategory === item
                                                ? 'bg-blue-600 text-white'
                                                : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700'
                                        }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            {filteredPosts.length > 0 ? (
                                <div className="mt-5 space-y-4">
                                    {filteredPosts.map((item) => (
                                        <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 sm:p-7">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                                                    {item.category}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                                                    <LockKeyhole size={13} />
                                                    Anonymous to the community
                                                </span>
                                            </div>

                                            <p className="mt-5 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700 sm:text-base">
                                                {item.content}
                                            </p>

                                            <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                                                <p className="text-xs text-slate-400">
                                                    Posted {formatDate(item.created_at)}
                                                </p>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditForm(item)}
                                                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                                                    >
                                                        <Pencil size={14} />
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteTarget(item.id)}
                                                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 size={14} />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <Feather size={25} />
                                    </div>
                                    <h3 className="mt-5 font-bold text-slate-900">
                                        {search || activeCategory !== 'All' ? 'No matching confessions' : 'Your space is waiting'}
                                    </h3>
                                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                        {search || activeCategory !== 'All'
                                            ? 'Try another search or category.'
                                            : 'You have not shared a confession yet. Start whenever you feel ready.'}
                                    </p>
                                    {search || activeCategory !== 'All' ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearch('');
                                                setActiveCategory('All');
                                            }}
                                            className="mt-5 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                        >
                                            Clear filters
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={openCreateForm}
                                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                                        >
                                            <Plus size={17} />
                                            Write your first confession
                                        </button>
                                    )}
                                </div>
                            )}
                        </section>

                        <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700">
                                    <ShieldCheck size={22} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Your story belongs to you.</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        Avoid including personal details in public posts. Anonymous posting
                                        cannot guarantee complete secrecy.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            {composerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div role="dialog" aria-modal="true" aria-labelledby="composer-title" className="my-auto w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <Feather size={23} />
                                </div>
                                <h2 id="composer-title" className="mt-4 text-2xl font-bold tracking-tight">
                                    {editingPost ? 'Edit your confession' : 'Write a confession'}
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Share only what feels comfortable to you.
                                </p>
                            </div>
                            <button type="button" onClick={closeForm} aria-label="Close form" className="rounded-xl p-2 text-slate-500 hover:bg-slate-100">
                                <X size={21} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-7">
                            <label htmlFor="category" className="mb-2 block text-sm font-semibold text-slate-800">
                                Category
                            </label>
                            <select
                                id="category"
                                value={form.data.category}
                                onChange={(event) => form.setData('category', event.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                            >
                                {postCategories.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                            {form.errors.category && <p className="mt-2 text-sm text-red-600">{form.errors.category}</p>}

                            <label htmlFor="content" className="mb-2 mt-5 block text-sm font-semibold text-slate-800">
                                Your thoughts
                            </label>
                            <textarea
                                id="content"
                                rows={7}
                                maxLength={5000}
                                required
                                value={form.data.content}
                                onChange={(event) => form.setData('content', event.target.value)}
                                placeholder="Start wherever you are..."
                                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                            />
                            {form.errors.content && <p className="mt-2 text-sm text-red-600">{form.errors.content}</p>}

                            <div className="mt-2 flex items-center justify-between gap-3">
                                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                                    <LockKeyhole size={13} />
                                    Your account name won't appear publicly.
                                </p>
                                <span className="text-xs text-slate-400">{form.data.content.length}/5000</span>
                            </div>

                            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button type="button" onClick={closeForm} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <ArrowRight size={16} />
                                    {form.processing ? 'Saving...' : editingPost ? 'Save changes' : 'Share confession'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteTarget !== null && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div role="alertdialog" aria-modal="true" aria-labelledby="delete-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <Trash2 size={23} />
                        </div>
                        <h2 id="delete-title" className="mt-5 text-xl font-bold">Delete this confession?</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            This action cannot be undone.
                        </p>
                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button type="button" onClick={() => setDeleteTarget(null)} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                                Keep post
                            </button>
                            <button type="button" onClick={handleDelete} className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">
                                Delete post
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
