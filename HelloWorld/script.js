// ১. URL থেকে ফাইলের নাম বের করা (যেমন: ?file=note1.md)
const urlParams = new URLSearchParams(window.location.search);
let fileName = urlParams.get('file');

// ২. যদি লিংকে কোনো ফাইল না থাকে, তবে ডিফল্ট একটা ফাইল দেখাবে
if (!fileName) {
    fileName = 'index.md'; 
}

// ৩. ফাইলটি ফেচ করে রেন্ডার করা
fetch(fileName)
    .then(response => {
        if (!response.ok) throw new Error("ফাইলটি ফোল্ডারে পাওয়া যায়নি!");
        return response.text();
    })
    .then(data => {
        document.getElementById('view').innerHTML = marked.parse(data);
    })
    .catch(err => {
        document.getElementById('view').innerHTML = `<h2 style="color:red;">ভুল হয়েছে: ${err.message}</h2>
        <p>নিশ্চিত করুন যে <b>${fileName}</b> ফাইলটি সঠিক ফোল্ডারে আছে।</p>`;
    });
