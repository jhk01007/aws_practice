document.getElementById('login-btn').addEventListener('click', function (event) {
    event.preventDefault();  // 기본 form 제출 방지

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    let isValid = true;

    // 유효성 검사
    if (!username.value) {
        showError(username, '아이디는 필수입력사항입니다.');
        isValid = false;
    } else {
        removeError(username);
    }

    if (!password.value) {
        showError(password, '비밀번호는 필수입력사항입니다.');
        isValid = false;
    } else {
        removeError(password);
    }

    if (!isValid) {
        return; // 유효성 검사를 통과하지 못하면 서버로 요청하지 않음
    }

    const loginData = {
        memberId: username.value,
        password: password.value
    };

    // 서버에 로그인 요청
    axios.post(`${config.API_BASE_URL}/members/login`, loginData, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true  // 쿠키 전송을 허용합니다.
    })
        .then(response => {
            if (response.status === 200) {
                alert('로그인 성공!');
                // 예: 메인 페이지로 리디렉션
                window.location.href = '../index.html';
            } else {
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        })
        .catch(error => {
            console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        });
});

function showError(inputElement, message) {
    const inputGroup = inputElement.parentElement;
    inputGroup.classList.add('error');
    let errorMessage = inputGroup.querySelector('.error-message');
    errorMessage.textContent = message;
}

function removeError(inputElement) {
    const inputGroup = inputElement.parentElement;
    inputGroup.classList.remove('error');
    const errorMessage = inputGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}
