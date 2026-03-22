// Test if the API endpoints actually exist and return data
const testRoutes = async () => {
    console.log('Testing API route implementation...\n');
    
    const routes = [
        { name: 'Courses API', url: 'https://deliteproductions.vercel.app/api/courses' },
        { name: 'Jobs API', url: 'https://deliteproductions.vercel.app/api/jobs' },
        { name: 'Funding API', url: 'https://deliteproductions.vercel.app/api/funding' },
        { name: 'Shop Products API', url: 'https://deliteproductions.vercel.app/api/shop/products' }
    ];

    for (const route of routes) {
        try {
            console.log(`Testing ${route.name}...`);
            const response = await fetch(route.url);
            
            if (response.status === 404) {
                console.log(`? ${route.name}: 404 Not Found - API route doesn't exist`);
            } else if (response.status === 200) {
                const data = await response.json();
                console.log(`? ${route.name}: Working - ${data.length || 0} items`);
            } else {
                console.log(`?? ${route.name}: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.log(`? ${route.name}: ${error.message}`);
        }
        console.log('');
    }
};

testRoutes();
