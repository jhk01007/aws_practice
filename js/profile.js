function previewImage(event) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function () {
        const previewImage = document.getElementById('profile-image-preview');
        previewImage.src = reader.result;
        document.getElementById('edit-btn').disabled = false;  // 이미지 업로드 시 버튼 활성화
    };

    if (input.files && input.files[0]) {
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('edit-btn').disabled = true;  // 파일이 없을 경우 버튼 비활성화
    }
}

async function loadProfile() {
    try {
        const response = await axios.get(`${config.API_BASE_URL}/members/memberInfo`, { withCredentials: true });
        return response.data; // axios 요청이 완료된 후 데이터를 반환
    } catch (error) {
        console.error('서버 요청 오류:', error);
        alert("서버 요청 오류: " + error);
        location.href = "../index.html";
        return null; // 에러가 발생했을 때 null을 반환하여 후속 작업에서 오류 처리가 가능하도록 함
    }
}

async function setProfileInfo() {
    const profileInfo = await loadProfile();
    if (profileInfo) {
        let memberId = document.getElementById('memberId-text');
        let phoneNum = document.getElementById('phoneNum-text');
        let profileImage = document.getElementById('profile-image-preview');

        memberId.textContent = profileInfo.memberId;
        phoneNum.textContent = profileInfo.phoneNum;
        profileImage.src = profileInfo.image;
    }
}

function goMain() {
    location.href = "../index.html";
}

function editProfile() {
    if (confirm("프로필 사진을 수정하시겠습니까?")) {
        const imageInput = document.getElementById('image');
        if (imageInput.files && imageInput.files[0]) {
            const formData = new FormData();
            formData.append('image', imageInput.files[0]);

            axios.post(`${config.API_BASE_URL}/members/changeProfile`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            .then(response => {
                alert('프로필 사진이 성공적으로 수정되었습니다.');
                location.reload(); // 페이지 새로고침하여 변경 사항 반영
            })
            .catch(error => {
                console.error('프로필 수정 오류:', error);
                alert('프로필 수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
            });
        } else {
            alert("업로드할 이미지가 없습니다.");
        }
    }
}

window.onload = function() {
    setProfileInfo();
}
