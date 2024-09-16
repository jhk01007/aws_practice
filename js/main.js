

// 서버에 세션 검증 요청을 보내는 함수
function checkSession() {
    axios.get(`${process.env.API_BASE_URL}/members/check-session`, { withCredentials: true }) // 서버 요청 시 쿠키도 함께 전송
        .then(response => {
            if (response.status === 200 && response.data.isValid) {
                // 세션이 유효한 경우: 로그인한 사용자용 화면 로드
                loadHTML('html/main_after_login.html', response.data.memberId);
            } else {
                loadHTML('html/main_before_login.html');
            }
        })
        .catch(error => {
            console.error('서버 요청 오류:', error);
            loadHTML('main_before_login.html'); // 오류 발생 시 로그인하지 않은 상태로 처리
        });
}

// HTML 파일을 동적으로 로드하는 함수
function loadHTML(filename, userId = null) {
    fetch(filename)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            if (userId) {
                document.getElementById('user-id').textContent = userId; // 로그인한 사용자 이름 설정
            }
        })
        .catch(error => {
            console.error('HTML 파일 로드 오류:', error);
        });
}

// 내 정보 확인 페이지로 이동
function viewProfile() {
    location.href = "../html/profile.html"
}

// 로그아웃 처리
function logout() {
    alert("로그아웃합니다.")
    axios.post(`${process.env.API_BASE_URL}/members/logout`, {}, { withCredentials: true }) // 서버 요청 시 쿠키도 함께 전송
        .then(response => {
            location.reload();
        })
        .catch(error => {
            console.error('서버 요청 오류:', error);
            location.reload();
        });
}

// 로그인 페이지로 이동
function login() {
    window.location.href = "../html/login.html"; // 로그인 페이지로 이동
}

function signup() {
    window.location.href = "../html/signup.html"; // 로그인 페이지로 이동
}

// 페이지 로드 시 세션 검증
window.onload = function() {
    checkSession();
};
