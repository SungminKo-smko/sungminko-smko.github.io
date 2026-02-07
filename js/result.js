// 결과 표시
let mbtiResult = '';
let typeData = {};

// Kakao SDK 초기화
if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    Kakao.init('1abe40bb8385bee1ed1d7f08e18fa3e0'); // JavaScript 키
}

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
    if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) {
        alert('카카오톡 공유 기능 준비 중이에요! 😊\n지금은 링크 복사를 이용해주세요.');
        return;
    }
    
    const url = window.location.origin;
    
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: `나는 ${mbtiResult} - ${typeData.name}!`,
            description: `${typeData.emoji} ${typeData.character} | ${typeData.description}`,
            imageUrl: 'https://via.placeholder.com/800x400/667eea/ffffff?text=' + mbtiResult,
            link: {
                mobileWebUrl: url,
                webUrl: url
            }
        },
        buttons: [
            {
                title: '나도 검사하기',
                link: {
                    mobileWebUrl: url,
                    webUrl: url
                }
            }
        ]
    });
}

// 문자메시지 공유
function shareSMS() {
    const text = `나는 ${mbtiResult} (${typeData.name})이야! 너도 검사해봐!\n${window.location.origin}`;
    
    // SMS 링크 생성
    const smsLink = `sms:?body=${encodeURIComponent(text)}`;
    
    // iOS에서는 &body=, Android에서는 ?body= 사용
    const userAgent = navigator.userAgent.toLowerCase();
    const finalLink = userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipad') > -1
        ? `sms:&body=${encodeURIComponent(text)}`
        : smsLink;
    
    window.location.href = finalLink;
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

// 이미지 저장
async function saveImage() {
    if (typeof html2canvas === 'undefined') {
        alert('이미지 저장 기능을 불러오는 중이에요! 잠시 후 다시 시도해주세요.');
        return;
    }
    
    showToast('이미지를 생성하는 중이에요... ⏳');
    
    try {
        // 결과 카드만 캡처
        const resultCard = document.querySelector('.result-card');
        const canvas = await html2canvas(resultCard, {
            backgroundColor: '#ffffff',
            scale: 2, // 고해상도
            logging: false
        });
        
        // Canvas를 이미지로 변환
        canvas.toBlob(function(blob) {
            // 모바일에서는 다운로드 대신 공유
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'mbti-result.png', { type: 'image/png' })] })) {
                const file = new File([blob], 'mbti-result.png', { type: 'image/png' });
                navigator.share({
                    title: `나의 MBTI - ${mbtiResult}`,
                    text: `나는 ${typeData.name}!`,
                    files: [file]
                }).catch(() => {
                    // 공유 취소 또는 실패 시 다운로드
                    downloadImage(blob);
                });
            } else {
                // 데스크톱에서는 다운로드
                downloadImage(blob);
            }
        }, 'image/png');
        
    } catch (error) {
        console.error('이미지 생성 실패:', error);
        showToast('이미지 생성에 실패했어요 😢 다시 시도해주세요.');
    }
}

// 이미지 다운로드
function downloadImage(blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mbti-${mbtiResult}-result.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast('이미지가 저장되었어요! 📸');
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

// 궁합 확인
function checkCompatibility() {
    const friendType = document.getElementById('friendType').value;
    
    if (!friendType) {
        alert('친구의 MBTI 유형을 선택해주세요!');
        return;
    }
    
    // 궁합 점수 계산
    const score = getCompatibilityScore(mbtiResult, friendType);
    const message = getCompatibilityMessage(score);
    
    // 결과 표시
    const resultDiv = document.getElementById('compatibilityResult');
    resultDiv.innerHTML = `
        <div class="compatibility-score">
            <div class="score-emoji">${message.emoji}</div>
            <div class="score-text">${score}점</div>
            <div class="score-subtitle">${message.title}</div>
        </div>
        <div class="compatibility-details">
            <p><strong>나:</strong> ${mbtiResult} ${typeData.emoji}</p>
            <p><strong>친구:</strong> ${friendType}</p>
            <p style="margin-top: 15px;">${message.description}</p>
        </div>
    `;
    resultDiv.style.display = 'block';
    
    // 스크롤
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
