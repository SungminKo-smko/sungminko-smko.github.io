// 결과 표시
let mbtiResult = '';
let typeData = {};

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async function() {
    // localStorage에서 결과 가져오기
    mbtiResult = localStorage.getItem('mbtiResult');
    
    if (!mbtiResult) {
        // 결과가 없으면 메인으로 리다이렉트
        alert('검사를 먼저 진행해주세요!');
        window.location.href = 'index.html';
        return;
    }
    
    // MBTI 타입 데이터 로드
    await loadTypeData();
    
    // 결과 표시
    displayResult();
});

// 타입 데이터 로드
async function loadTypeData() {
    try {
        const response = await fetch('data/types.json');
        const allTypes = await response.json();
        typeData = allTypes[mbtiResult];
    } catch (error) {
        console.error('타입 데이터 로드 실패:', error);
        typeData = {
            name: '특별한 성격',
            emoji: '⭐',
            character: '별',
            description: '당신은 특별한 사람이에요!',
            traits: ['특별해요', '멋져요', '최고예요'],
            color: '#667eea'
        };
    }
}

// 결과 표시
function displayResult() {
    // 결과 카드 배경색 설정
    const resultCard = document.getElementById('resultCard');
    resultCard.style.borderColor = typeData.color;
    
    // MBTI 타입 표시
    document.getElementById('mbtiType').textContent = mbtiResult;
    document.getElementById('mbtiType').style.color = typeData.color;
    
    // 캐릭터 이모지
    document.getElementById('characterEmoji').textContent = typeData.emoji;
    
    // 타입 이름
    document.getElementById('typeName').textContent = typeData.name;
    
    // 캐릭터 이름
    document.getElementById('characterName').textContent = `${typeData.emoji} ${typeData.character}`;
    
    // 설명
    document.getElementById('description').textContent = typeData.description;
    
    // 특징 리스트
    const traitsList = document.getElementById('traitsList');
    traitsList.innerHTML = '';
    
    typeData.traits.forEach((trait, index) => {
        const li = document.createElement('li');
        li.textContent = `✓ ${trait}`;
        li.style.borderLeftColor = typeData.color;
        traitsList.appendChild(li);
    });
}

// 카카오톡 공유
function shareKakao() {
    // 카카오 SDK가 로드되지 않았으면 안내
    alert('카카오톡 공유 기능은 곧 추가될 예정이에요! 😊\n지금은 링크 복사를 이용해주세요.');
}

// 링크 복사
function shareLink() {
    const url = window.location.origin + window.location.pathname.replace('result.html', 'index.html');
    
    // 클립보드 API 사용
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('링크가 복사되었어요! 친구들에게 공유해보세요 🎉');
        }).catch(() => {
            // 폴백: 텍스트 영역 사용
            fallbackCopyText(url);
        });
    } else {
        fallbackCopyText(url);
    }
}

// 폴백 복사 함수
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('링크가 복사되었어요! 친구들에게 공유해보세요 🎉');
    } catch (err) {
        alert('링크 복사에 실패했어요 😢\n수동으로 복사해주세요:\n' + text);
    }
    
    document.body.removeChild(textArea);
}

// 이미지 저장 (간단 버전)
function saveImage() {
    alert('이미지 저장 기능은 곧 추가될 예정이에요! 😊\n지금은 스크린샷을 찍어주세요.');
}

// 다시하기
function restart() {
    // localStorage 클리어
    localStorage.removeItem('mbtiResult');
    localStorage.removeItem('answers');
    
    // 메인 페이지로 이동
    window.location.href = 'index.html';
}

// 토스트 메시지 표시
function showToast(message) {
    // 토스트 요소 생성
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 0.95rem;
        z-index: 1000;
        animation: fadeInUp 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // 3초 후 제거
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 애니메이션 CSS 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
