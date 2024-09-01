function previewImage(event) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function () {
        const previewImage = document.getElementById('profile-image-preview');
        previewImage.src = reader.result;
    };

    if (input.files && input.files[0]) {
        reader.readAsDataURL(input.files[0]);
    }
}

let isMemberIdValid = false; // 아이디 유효성을 확인하는 변수

function checkMemberId() {
    const memberIdInput = document.getElementById('memberId');
    const memberIdMessage = document.getElementById('memberId-message');
    const memberId = memberIdInput.value;

    if (!memberId) return; // 입력이 비어 있으면 중복 확인을 하지 않음

    // 서버에 아이디 중복 확인 요청
    axios.get(`http://localhost:8080/members/checkIdDuplicate?memberId=${memberId}`)
        .then(response => {
            if (response.data.available) {
                // 사용 가능한 아이디
                memberIdMessage.textContent = '사용 가능한 아이디입니다.';
                memberIdInput.parentElement.classList.remove('error');
                memberIdInput.parentElement.classList.add('success');
                isMemberIdValid = true; // 아이디가 유효함을 설정
            } else {
                // 중복된 아이디
                memberIdMessage.textContent = '중복된 아이디입니다.';
                memberIdInput.parentElement.classList.remove('success');
                memberIdInput.parentElement.classList.add('error');
                isMemberIdValid = false; // 아이디가 유효하지 않음
            }
        })
        .catch(error => {
            console.error('아이디 중복 확인 오류:', error);
            memberIdMessage.textContent = '서버 오류가 발생했습니다.';
            memberIdMessage.style.color = 'red';
            memberIdMessage.style.display = 'block';
            isMemberIdValid = false; // 유효하지 않은 상태로 설정
        });
}

function isSignUpFormValid(memberIdInput, passwordInput, phoneNumInput) {
    let isFormValid = true;

    // 각 입력 필드의 유효성 검사
    if (memberIdInput.value === '') {
        memberIdInput.parentElement.classList.add('error');
        document.getElementById('memberId-message').textContent = '아이디를 입력해주세요';
        document.getElementById('memberId-message').style.display = 'block';
        isFormValid = false;
    } else if (!isMemberIdValid) {
        isFormValid = false;
    } else {
        memberIdInput.parentElement.classList.remove('error');
        document.getElementById('memberId-message').style.display = 'none';
    }

    if (passwordInput.value === '') {
        passwordInput.parentElement.classList.add('error');
        document.getElementById('password-message').textContent = '비밀번호를 입력해 주세요.';
        document.getElementById('password-message').style.display = 'block';
        isFormValid = false;
    } else {
        passwordInput.parentElement.classList.remove('error');
        document.getElementById('password-message').style.display = 'none';
    }

    if (phoneNumInput.value === '') {
        phoneNumInput.parentElement.classList.add('error');
        document.getElementById('phoneNum-message').textContent = '전화번호를 입력해 주세요.';
        document.getElementById('phoneNum-message').style.display = 'block';
        isFormValid = false;
    } else {
        phoneNumInput.parentElement.classList.remove('error');
        document.getElementById('phoneNum-message').style.display = 'none';
    }
    return isFormValid;
}

// 회원가입 폼 추가 함수
async function addSignupForm(memberIdInput, passwordInput, phoneNumInput, imageInput) {
    const formData = new FormData();
    formData.append('memberId', memberIdInput.value);
    formData.append('password', passwordInput.value);
    formData.append('phoneNum', phoneNumInput.value);
    if (imageInput.files && imageInput.files.length > 0) {
        // 사용자가 이미지를 업로드한 경우
        formData.append('image', imageInput.files[0]);
    } else {
        // 사용자가 이미지를 업로드하지 않은 경우 기본 이미지 Blob을 추가
        const defaultImageSrc = document.getElementById('profile-image-preview').src;
        // 기본 이미지를 Blob으로 변환하여 FormData에 추가
        const blob = await fetch(defaultImageSrc)
            .then(response => response.blob())
            .catch(error => {
                console.error('기본 이미지 로드 오류:', error);
                alert('기본 이미지를 설정하는 중 오류가 발생했습니다. 다시 시도해 주세요.');
            });

        if (blob) {
            formData.append('image', blob, 'default-profile.webp'); // 기본 이미지 추가
        }
    }
    return formData;
}

// 폼 제출 이벤트 핸들러
document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault();  // 기본 form 제출 방지
    const memberIdInput = document.getElementById('memberId');
    const passwordInput = document.getElementById('password');
    const phoneNumInput = document.getElementById('phoneNum');
    const imageInput = document.getElementById('image');


    // 폼이 유효하지 않으면 제출을 방지
    if (!isSignUpFormValid(memberIdInput, passwordInput, phoneNumInput)) {
        event.preventDefault();
        return;
    }

    // FormData 객체 생성 및 폼 데이터 추가
    const formData = await addSignupForm(memberIdInput, passwordInput, passwordInput, imageInput);
    // 서버에 회원가입 요청
    await requestSignup(formData);


});

async function requestSignup(formData) {
    // 서버로 데이터 전송
    axios.post('http://localhost:8080/members/signup', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        // 성공 시 처리
        alert('회원가입이 완료되었습니다.');
        location.href = "../index.html";
    })
    .catch(error => {
        // 실패 시 처리
        console.error('회원가입 오류:', error);
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
        location.reload();
    });
}
