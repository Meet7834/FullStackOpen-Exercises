const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.map(b => sum += b.likes)
    return sum
}

const favouriteBlog = (blogs) => {
    let maxLikesIndex = 0;
    if (blogs.length === 0) return {}
    else{
        let maxLikes = blogs[0].likes
        for (let i = 0; i < blogs.length; i++) if (blogs[i].likes > maxLikes) {
            maxLikes = blogs[i].likes
            maxLikesIndex = i
        }
    }
    return blogs[maxLikesIndex]
}

module.exports = { dummy, totalLikes, favouriteBlog }