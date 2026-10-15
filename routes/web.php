
<?php

use App\Http\Controllers\ConfessionController;
use App\Http\Controllers\ProfileController;
use App\Models\Confession;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $userId = Auth::id();

        $myConfessions = Confession::query()
            ->where('user_id', $userId);

        $recentConfessions = (clone $myConfessions)
            ->latest()
            ->take(5)
            ->get(['id', 'category', 'content', 'created_at'])
            ->map(function (Confession $confession) {
                return [
                    'id' => $confession->id,
                    'category' => $confession->category,
                    'content' => $confession->content,
                    'created_at' => $confession->created_at,
                ];
            });

        return Inertia::render('Dashboard', [
            'myConfessionsCount' => $myConfessions->count(),
            'communityConfessionsCount' => Confession::count(),
            'recentConfessions' => $recentConfessions,
        ]);
    })->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/confessions', [ConfessionController::class, 'index'])
        ->name('confessions.index');

    Route::post('/confessions', [ConfessionController::class, 'store'])
        ->name('confessions.store');

    Route::put('/confessions/{confession}', [ConfessionController::class, 'update'])
        ->name('confessions.update');

    Route::delete('/confessions/{confession}', [ConfessionController::class, 'destroy'])
        ->name('confessions.destroy');

    Route::get('/my-confessions', [ConfessionController::class, 'myConfessions'])
        ->name('my-confessions.index');

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

require __DIR__.'/auth.php';
