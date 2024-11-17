async function fetchRepos() {
    try {
        const users = "Gustiagung19"
        const response = await fetch(`https://api.github.com/users/${users}/repos`);
        const repos = await response.json();

        // Sort the repos by 'updated_at' in descending order (newest first)
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        const repoCards = document.getElementById('repo-cards');
        repos.forEach(repo => {
            const cardHTML = `
                <div class="col">
                    <div class="card shadow-sm">
                        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <title>${repo.name}</title>
                            <rect width="100%" height="100%" fill="#55595c"/>
                            <text x="50%" y="50%" fill="#eceeef" dy=".3em">${repo.name}</text>
                        </svg>
                        <div class="card-body">
                            <p class="card-text">${repo.description || 'No description available.'}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-sm btn-outline-secondary">View</a>
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                                <small class="text-body-secondary">${new Date(repo.updated_at).toLocaleDateString()}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            repoCards.insertAdjacentHTML('beforeend', cardHTML);
        });
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

// Call the function to fetch repositories
fetchRepos();