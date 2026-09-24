const PRIVATE_PATHS = ['dashboard', 'profile'];

export function isPrivateRoute(url: string | null | undefined): boolean {
    if (!url) return false;

    const path = url.replace(/^(aurora:\/\/app\/|https:\/\/aurora\.dev\/)/, '');
    const segments = path.split('/');
    const rootSegment = segments[0]?.split('?')[0];

    return PRIVATE_PATHS.includes(rootSegment);
}