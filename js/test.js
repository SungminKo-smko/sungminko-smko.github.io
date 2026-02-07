// 검사 진행 관리
let currentQuestion = 0;
let answers = {}; // { questionId: 'E' or 'I' or 'S' or 'N' ... }

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 랜덤 질문 생성
    questions = selectRandomQuestions();
    showQuestion(currentQuestion);
});

// 질문 표시
function showQuestion(index) {
    const question = questions[index];
    
    // 질문 번호와 텍스트 업데이트
    document.getElementById('questionNumber').textContent = `질문 ${index + 1}`;
    document.getElementById('questionText').textContent = question.question;
    
    // 진행률 업데이트
    updateProgress();
    
    // 선택지 생성
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, optionIndex) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;
        button.setAttribute('data-value', option.value);
        
        // 이전에 선택한 답이 있으면 표시
        if (answers[question.id] === option.value) {
            button.classList.add('selected');
        }
        
        button.onclick = () => selectOption(question.id, option.value, button);
        optionsContainer.appendChild(button);
        
        // 애니메이션 효과
        setTimeout(() => {
            button.style.animation = 'slideIn 0.5s ease';
        }, optionIndex * 100);
    });
    
    // 버튼 상태 업데이트
    updateButtons();
}

// 선택지 선택
function selectOption(questionId, value, button) {
    // 답변 저장
    answers[questionId] = value;
    
    // 모든 선택지에서 selected 클래스 제거
    const allButtons = button.parentElement.querySelectorAll('.option-button');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    
    // 선택한 버튼에 selected 클래스 추가
    button.classList.add('selected');
    
    // 다음 버튼 활성화
    document.getElementById('nextBtn').disabled = false;
    
    // 자동으로 다음 질문으로 (선택사항)
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            nextQuestion();
        } else {
            // 마지막 질문이면 결과 페이지로 이동 버튼 표시
            const nextBtn = document.getElementById('nextBtn');
            nextBtn.textContent = '결과 보기 🎉';
            nextBtn.onclick = () => showResult();
        }
    }, 500);
}

// 이전 질문
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

// 다음 질문
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

// 진행률 업데이트
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `${currentQuestion + 1} / ${questions.length}`;
}

// 버튼 상태 업데이트
function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // 이전 버튼
    prevBtn.disabled = currentQuestion === 0;
    
    // 다음 버튼
    const currentQuestionId = questions[currentQuestion].id;
    const hasAnswer = answers[currentQuestionId] !== undefined;
    
    if (currentQuestion === questions.length - 1 && hasAnswer) {
        nextBtn.textContent = '결과 보기 🎉';
        nextBtn.onclick = () => showResult();
        nextBtn.disabled = false;
    } else {
        nextBtn.textContent = '다음 →';
        nextBtn.onclick = () => nextQuestion();
        nextBtn.disabled = !hasAnswer;
    }
}

// 결과 계산 및 페이지 이동
function showResult() {
    // 모든 질문에 답했는지 확인
    if (Object.keys(answers).length < questions.length) {
        alert('모든 질문에 답해주세요!');
        return;
    }
    
    // MBTI 타입 계산
    const mbtiType = calculateMBTI();
    
    // 결과를 localStorage에 저장
    localStorage.setItem('mbtiResult', mbtiType);
    localStorage.setItem('answers', JSON.stringify(answers));
    
    // 결과 페이지로 이동
    window.location.href = 'result.html';
}

// MBTI 타입 계산
function calculateMBTI() {
    const scores = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
    };
    
    // 각 답변의 점수 집계
    Object.values(answers).forEach(value => {
        scores[value]++;
    });
    
    // 각 차원별 우세한 타입 결정
    const type = 
        (scores.E >= scores.I ? 'E' : 'I') +
        (scores.S >= scores.N ? 'S' : 'N') +
        (scores.T >= scores.F ? 'T' : 'F') +
        (scores.J >= scores.P ? 'J' : 'P');
    
    return type;
}
