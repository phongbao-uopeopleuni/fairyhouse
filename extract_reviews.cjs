const fs = require('fs');

const contentPath = 'C:\\Users\\Phong Bao\\.gemini\\antigravity\\brain\\3d5cf46f-04b8-42b9-b2e4-c3e2bdbfeea2\\.system_generated\\steps\\454\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

// Find things that look like reviews. Google Travel reviews often contain text in strings.
// Let's decode unicode escapes first.
const unescaped = content.replace(/\\u([\d\w]{4})/gi, (match, grp) => String.fromCharCode(parseInt(grp, 16)));

// Look for patterns that resemble reviews. We can look for strings longer than 50 chars that contain common review words.
const matches = unescaped.match(/"([^"]{50,500})"/g);

const vietnameseReviewKeywords = ['tuyệt vời', 'sạch sẽ', 'thân thiện', 'thoải mái', 'homestay', 'phòng', 'tiện nghi', 'giá cả', 'đẹp'];

if (matches) {
    const possibleReviews = matches.filter(m => {
        const lower = m.toLowerCase();
        return vietnameseReviewKeywords.some(k => lower.includes(k)) && !lower.includes('<html') && !lower.includes('function(');
    });

    const uniqueReviews = [...new Set(possibleReviews)];
    console.log("Found " + uniqueReviews.length + " possible reviews.");
    uniqueReviews.slice(0, 20).forEach((r, i) => {
        console.log(`Review ${i+1}: ${r}`);
    });
} else {
    console.log("No matches found.");
}
