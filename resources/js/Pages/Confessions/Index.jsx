
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
    MessageCircle,
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

export default function Index() {
    const { props } = usePage();
    const confessions = props.confessions ?? [];
    const successMessage = props.flash?.success;
    const errorMessage = props.flash?.error;

    const [activeCategory, setActiveCategory] = useState('All');
    const [search, setSearch] = useState('');
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
                activeCategory === 'All' ||
                item.category === activeCategory;

            const matchesSearch =
                !query ||
                item.content?.toLowerCase().includes(query) ||
                item.category?.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [confessions, activeCategory, search]);

    const openCreateForm = () => {
        setEditingPost(null);
        form.reset();
        form.clearErrors();
        form.setData({
            category: 'Life',
            content: '',
        });
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

    const closeComposer = () => {
        setComposerOpen(false);
        setEditingPost(null);
        form.reset();
        form.clearErrors();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                closeComposer();
            },
        };

        if (editingPost) {
            form.put(
                route('confessions.update', editingPost.id),
                options,
            );
        } else {
            form.post(route('confessions.store'), options);
        }
    };

    const handleDelete = () => {
        if (deleteTarget === null) return;

        router.delete(
            route('confessions.destroy', deleteTarget.id),
            {
                preserveScroll: true,
                onSuccess: () => setDeleteTarget(null),
                onError: () => setDeleteTarget(null),
            },
        );
    };

    const handleLogout = (event) => {
        event.preventDefault();
        logoutForm.post(route('logout'));
    };

    const formatDate = (date) => {
        if (!date) return 'Recently';

        const parsed = new Date(date);

        if (Number.isNaN(parsed.getTime())) return 'Recently';

        return parsed.toLocaleDateString('en-PH', {
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
            <Head title="Confession Wall | Whisper Wall" />

            <div className="min-h-screen bg-slate-50 text-slate-950">
                <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
                    <Link
                        href="/"
                        className="flex h-20 items-center gap-3 border-b border-slate-100 px-6"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <Feather size={22} />
                        </div>
                        <div>
                            <span className="block font-bold tracking-tight">
                                Whisper Wall
                            </span>
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
                                const active = item.label === 'Confession Wall';

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
                            <h3 className="mt-4 font-semibold">
                                Keep this space kind
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-300">
                                Respect other people's stories. Share only what feels comfortable.
                            </p>
                        </div>

                        <form
                            onSubmit={handleLogout}
                            className="mt-4"
                        >
                            <button
                                type="submit"
                                disabled={logoutForm.processing}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 disabled:opacity-50"
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
                                    <p className="text-xs font-medium text-slate-500">
                                        Community
                                    </p>
                                    <h1 className="mt-0.5 font-bold tracking-tight">
                                        Confession Wall
                                    </h1>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={openCreateForm}
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                <Plus size={18} />
                                <span className="hidden sm:inline">Write a confession</span>
                                <span className="sm:hidden">Write</span>
                            </button>
                        </div>

                        {menuOpen && (
                            <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
                                <nav className="space-y-1">
                                    {navigation.map((item) => {
                                        const Icon = item.icon;
                                        const active = item.label === 'Confession Wall';

                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setMenuOpen(false)}
                                                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
                                                    active
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

                    <main className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                        <section className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-8 text-white sm:px-9 sm:py-10">
                            <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border-[45px] border-white/10" />

                            <div className="relative max-w-2xl">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50">
                                    <LockKeyhole size={14} />
                                    Anonymous by design
                                </div>

                                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                                    A place to let it out.
                                </h2>

                                <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                                    Write about what's on your mind, read other people's
                                    experiences, and remember to treat every story with kindness.
                                </p>

                                <button
                                    type="button"
                                    onClick={openCreateForm}
                                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                                >
                                    Share your thoughts
                                    <ArrowRight size={17} />
                                </button>
                            </div>
                        </section>

                        {successMessage && (
                            <div
                                role="status"
                                className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                            >
                                {successMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div
                                role="alert"
                                className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                            >
                                {errorMessage}
                            </div>
                        )}

                        <section className="mt-8">
                            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        Community confessions
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Every post is a story. Read with empathy, not judgment.
                                    </p>
                                </div>

                                <div className="relative w-full lg:max-w-sm">
                                    <Search
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type="search"
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search confessions..."
                                        aria-label="Search confessions"
                                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
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
                        </section>

                        <section className="mt-6">
                            {filteredPostsCount(filteredPosts) > 0 ? (
                                <div className="grid gap-5 xl:grid-cols-2">
                                    {filteredPosts.map((item) => (
                                        <article
                                            key={item.id}
                                            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/[0.03] sm:p-7"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                                                    {item.category}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                                                    <LockKeyhole size={13} />
                                                    Anonymous
                                                </span>
                                            </div>

                                            <p className="mt-5 whitespace-pre-wrap break-words text-[15px] leading-7 text-slate-700">
                                                {item.content}
                                            </p>

                                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                                        <Feather size={15} />
                                                    </div>
                                                    <span>Anonymous</span>
                                                    <span>·</span>
                                                    <span>{formatDateSafe(item.created_at)}</span>
                                                </div>

                                                {item.is_owner && (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => openEditForm(item)}
                                                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                                                        >
                                                            <Pencil size={14} />
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => setDeleteTarget(item)}
                                                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                                                        >
                                                            <Trash2 size={14} />
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <MessageCircle size={25} />
                                    </div>
                                    <h3 className="mt-5 font-bold text-slate-900">
                                        No confessions found
                                    </h3>
                                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                        {search || activeCategory !== 'All'
                                            ? 'Try another search or category.'
                                            : 'There are no confessions yet. You can be the first to share a thought.'}
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
                                            Write a confession
                                        </button>
                                    )}
                                </div>
                            )}
                        </section>

                        <section className="mt-8 flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700">
                                <Heart size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Help keep this a safe space.
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Respect different experiences. Avoid sharing private
                                    information about yourself or others. Respond with
                                    compassion rather than judgment.
                                </p>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            {composerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="composer-title"
                        className="my-auto w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <Feather size={23} />
                                </div>
                                <h2 id="composer-title" className="mt-4 text-2xl font-bold tracking-tight">
                                    {editingPost ? 'Edit your confession' : 'Let it out'}
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Share only what feels comfortable to you.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeComposer}
                                aria-label="Close form"
                                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
                            >
                                <X size={21} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-7">
                            <label htmlFor="confession-category" className="mb-2 block text-sm font-semibold text-slate-800">
                                Choose a category
                            </label>
                            <select
                                id="confession-category"
                                value={form.data.category}
                                onChange={(event) => form.setData('category', event.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                            >
                                {postCategories.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {form.errors.category && (
                                <p className="mt-2 text-sm text-red-600">
                                    {form.errors.category}
                                </p>
                            )}

                            <label htmlFor="confession-content" className="mb-2 mt-5 block text-sm font-semibold text-slate-800">
                                What's on your mind?
                            </label>
                            <textarea
                                id="confession-content"
                                value={form.data.content}
                                onChange={(event) => form.setData('content', event.target.value)}
                                rows={7}
                                maxLength={5000}
                                required
                                placeholder="Start wherever you are..."
                                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                            />
                            {form.errors.content && (
                                <p className="mt-2 text-sm text-red-600">
                                    {form.errors.content}
                                </p>
                            )}

                            <div className="mt-2 flex items-center justify-between gap-3">
                                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                                    <LockKeyhole size={13} />
                                    Your account name won't appear publicly.
                                </p>
                                <span className="text-xs text-slate-400">
                                    {form.data.content.length}/5000
                                </span>
                            </div>

                            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeComposer}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Feather size={16} />
                                    {form.processing
                                        ? 'Saving...'
                                        : editingPost
                                            ? 'Save changes'
                                            : 'Share confession'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteTarget && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="delete-title"
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <Trash2 size={23} />
                        </div>
                        <h2 id="delete-title" className="mt-5 text-xl font-bold">
                            Delete this confession?
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            This action cannot be undone.
                        </p>
                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setDeleteTarget(null)}
                                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                                Keep post
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
                            >
                                Delete post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function filteredPostsCount(posts) {
    return posts.length;
}

function formatDateSafe(date) {
    if (!date) return 'Recently';

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return 'Recently';

    return parsed.toLocaleDateString('en-PH', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}
