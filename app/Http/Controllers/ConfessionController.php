<?php

namespace App\Http\Controllers;

use App\Models\Confession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ConfessionController extends Controller
{
    public function index(): Response
    {
        $confessions = Confession::query()
            ->latest()
            ->get()
            ->map(function (Confession $confession) {
                return [
                    'id' => $confession->id,
                    'category' => $confession->category,
                    'content' => $confession->content,
                    'created_at' => $confession->created_at,
                    'is_owner' => (int) $confession->user_id === (int) Auth::id(),
                ];
            });

        return Inertia::render('Confessions/Index', [
            'confessions' => $confessions,
        ]);
    }

    public function myConfessions(): Response
    {
        $confessions = Confession::query()
            ->where('user_id', Auth::id())
            ->latest()
            ->get()
            ->map(function (Confession $confession) {
                return [
                    'id' => $confession->id,
                    'category' => $confession->category,
                    'content' => $confession->content,
                    'created_at' => $confession->created_at,
                ];
            });

        return Inertia::render('MyConfessions/Index', [
            'confessions' => $confessions,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category' => [
                'required',
                'string',
                'in:Life,School,Family,Relationships,Mental Health,Other',
            ],
            'content' => ['required', 'string', 'min:1', 'max:5000'],
        ]);

        Confession::create([
            'user_id' => Auth::id(),
            'category' => $validated['category'],
            'content' => $validated['content'],
        ]);

        return back()->with('success', 'Your confession has been shared.');
    }

    public function update(
        Request $request,
        Confession $confession
    ): RedirectResponse {
        abort_unless(
            (int) $confession->user_id === (int) Auth::id(),
            403,
            'You cannot edit someone else’s confession.'
        );

        $validated = $request->validate([
            'category' => [
                'required',
                'string',
                'in:Life,School,Family,Relationships,Mental Health,Other',
            ],
            'content' => ['required', 'string', 'min:1', 'max:5000'],
        ]);

        $confession->update([
            'category' => $validated['category'],
            'content' => $validated['content'],
        ]);

        return back()->with('success', 'Your confession has been updated.');
    }

    public function destroy(Confession $confession): RedirectResponse
    {
        abort_unless(
            (int) $confession->user_id === (int) Auth::id(),
            403,
            'You cannot delete someone else’s confession.'
        );

        $confession->delete();

        return back()->with('success', 'Your confession has been deleted.');
    }
}
