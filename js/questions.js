// MBTI 검사 질문 데이터
// 각 질문은 E/I, S/N, T/F, J/P 중 하나를 측정합니다

const questions = [
    // E vs I (외향 vs 내향) - 4문항
    {
        id: 1,
        dimension: 'EI',
        question: '새 학기가 시작됐어요! 어떻게 할 거예요?',
        options: [
            { text: '친구들에게 먼저 다가가서 인사해요 👋', value: 'E' },
            { text: '친구가 말을 걸어줄 때까지 기다려요 🤫', value: 'I' }
        ]
    },
    {
        id: 2,
        dimension: 'EI',
        question: '주말에 뭐 하고 싶어요?',
        options: [
            { text: '친구들이랑 밖에서 신나게 놀래요 🎮', value: 'E' },
            { text: '집에서 혼자 좋아하는 걸 하고 싶어요 🏠', value: 'I' }
        ]
    },
    {
        id: 3,
        dimension: 'EI',
        question: '재미있는 일이 생기면?',
        options: [
            { text: '바로 친구들한테 이야기해요! 📢', value: 'E' },
            { text: '혼자 생각하면서 즐거워해요 😊', value: 'I' }
        ]
    },
    {
        id: 4,
        dimension: 'EI',
        question: '수업 시간에 조별 활동을 해요!',
        options: [
            { text: '친구들이랑 이야기 나누는 게 재미있어요 💬', value: 'E' },
            { text: '혼자 집중해서 하는 게 더 좋아요 ✍️', value: 'I' }
        ]
    },

    // S vs N (감각 vs 직관) - 4문항
    {
        id: 5,
        dimension: 'SN',
        question: '레고나 블록을 만들 때',
        options: [
            { text: '설명서를 보면서 정확하게 만들어요 📖', value: 'S' },
            { text: '내 상상대로 자유롭게 만들어요 ✨', value: 'N' }
        ]
    },
    {
        id: 6,
        dimension: 'SN',
        question: '이야기를 들을 때',
        options: [
            { text: '무슨 일이 일어났는지 자세히 알고 싶어요 🔍', value: 'S' },
            { text: '전체 줄거리가 어떤지 궁금해요 📚', value: 'N' }
        ]
    },
    {
        id: 7,
        dimension: 'SN',
        question: '그림을 그릴 때',
        options: [
            { text: '눈에 보이는 것을 그려요 🎨', value: 'S' },
            { text: '머릿속 상상을 그려요 🌈', value: 'N' }
        ]
    },
    {
        id: 8,
        dimension: 'SN',
        question: '새로운 게임을 배울 때',
        options: [
            { text: '규칙을 하나씩 배워가면서 해요 📝', value: 'S' },
            { text: '일단 해보면서 감으로 배워요 🎯', value: 'N' }
        ]
    },

    // T vs F (사고 vs 감정) - 4문항
    {
        id: 9,
        dimension: 'TF',
        question: '친구가 잘못했을 때',
        options: [
            { text: '뭐가 잘못됐는지 설명해줘요 💡', value: 'T' },
            { text: '기분 나쁠까봐 조심스럽게 이야기해요 💕', value: 'F' }
        ]
    },
    {
        id: 10,
        dimension: 'TF',
        question: '게임을 할 때 가장 중요한 건?',
        options: [
            { text: '이기는 게 제일 중요해요! 🏆', value: 'T' },
            { text: '친구들이랑 재미있게 하는 게 중요해요 🎉', value: 'F' }
        ]
    },
    {
        id: 11,
        dimension: 'TF',
        question: '친구가 울고 있어요',
        options: [
            { text: '왜 우는지 이유를 물어봐요 🤔', value: 'T' },
            { text: '먼저 위로해주고 안아줘요 🤗', value: 'F' }
        ]
    },
    {
        id: 12,
        dimension: 'TF',
        question: '선생님께 질문할 때',
        options: [
            { text: '궁금한 걸 바로바로 물어봐요 ❓', value: 'T' },
            { text: '괜찮으신지 눈치를 먼저 봐요 👀', value: 'F' }
        ]
    },

    // J vs P (판단 vs 인식) - 4문항
    {
        id: 13,
        dimension: 'JP',
        question: '숙제는 언제 해요?',
        options: [
            { text: '미리미리 해요! 📅', value: 'J' },
            { text: '내일 하면 되지~ 마감일 전에만 하면 돼요 ⏰', value: 'P' }
        ]
    },
    {
        id: 14,
        dimension: 'JP',
        question: '놀러 갈 때',
        options: [
            { text: '계획을 세우고 그대로 해요 📋', value: 'J' },
            { text: '그때그때 하고 싶은 거 해요 🎈', value: 'P' }
        ]
    },
    {
        id: 15,
        dimension: 'JP',
        question: '내 책상 위는',
        options: [
            { text: '깔끔하게 정리되어 있어요 📚', value: 'J' },
            { text: '필요한 것들이 여기저기 있어요 🎨', value: 'P' }
        ]
    },
    {
        id: 16,
        dimension: 'JP',
        question: '갑자기 계획이 바뀌면',
        options: [
            { text: '좀 불편해요... 😰', value: 'J' },
            { text: '상관없어요! 재미있을 것 같아요 😄', value: 'P' }
        ]
    }
];
