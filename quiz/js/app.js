// Logika utama SANCAKA - Cyber-Kejawen (Vanilla JS)

function initApp() {
  console.log('App initialization started');
  // Ambil elemen DOM
  const pages = {
    landing: document.getElementById('landing-page'),
    categoryLearn: document.getElementById('category-learn-page'),
    learn: document.getElementById('learn-page'),
    categoryQuiz: document.getElementById('category-quiz-page'),
    quiz: document.getElementById('quiz-page'),
    result: document.getElementById('result-page')
  };

  // Landing Page Elements
  const learnBtn = document.getElementById('learn-btn');
  const quizBtn = document.getElementById('quiz-btn');
  console.log('learnBtn:', learnBtn);
  console.log('quizBtn:', quizBtn);

  // Category Page Elements
  const categoryLearnButtons = document.querySelectorAll('#category-learn-page .category-btn');
  const categoryQuizButtons = document.querySelectorAll('#category-quiz-page .category-btn');

  // Back Buttons
  const backToLandingLearn = document.getElementById('back-to-landing-learn');
  const backToLandingQuiz = document.getElementById('back-to-landing-quiz');
  const backToCategoryLearn = document.getElementById('back-to-category-learn');
  const backToCategoryQuiz = document.getElementById('back-to-category-quiz');
  const backToCategoryResult = document.getElementById('back-to-category-result');
  const backToCategories = document.getElementById('back-to-categories');

  // Learn Page Elements
  const learnCategoryTitle = document.getElementById('learn-category-title');
  const flashcardCurrent = document.getElementById('flashcard-current');
  const flashcardTotal = document.getElementById('flashcard-total');
  const flashcardImage = document.getElementById('flashcard-image');
  const flashcardName = document.getElementById('flashcard-name');
  const flashcardDescription = document.getElementById('flashcard-description');
  const flipFlashcard = document.getElementById('flip-flashcard');
  const flipFlashcardBack = document.getElementById('flip-flashcard-back');
  const prevFlashcard = document.getElementById('prev-flashcard');
  const nextFlashcard = document.getElementById('next-flashcard');
  const prevFlashcardBack = document.getElementById('prev-flashcard-back');
  const nextFlashcardBack = document.getElementById('next-flashcard-back');
  const flashcard = document.querySelector('.flashcard');

  // Quiz Elements
  const questionText = document.getElementById('question-text');
  const questionImageContainer = document.getElementById('question-image-container');
  const optionsContainer = document.getElementById('options-container');
  const feedbackSection = document.getElementById('feedback-section');
  const feedbackMessage = document.getElementById('feedback-message');
  const feedbackExplanation = document.getElementById('feedback-explanation');
  const nextBtn = document.getElementById('next-btn');

  // Progress Elements
  const questionCounter = document.getElementById('question-counter');
  const progressFill = document.getElementById('progress-fill');

  // Result Elements
  const finalScore = document.getElementById('final-score');
  const scorePercentageText = document.getElementById('score-percentage-text');
  const scoreMessage = document.getElementById('score-message');
  const resultCategory = document.getElementById('result-category');

  // State
  let currentMode = null; // 'learn' or 'quiz'
  let currentCategory = null;
  let currentCategoryData = null;
  let currentIndex = 0;
  let score = 0;
  let quizQuestions = [];
  const totalQuestions = window.QUIZ_CONFIG?.totalQuestions || 5;

  // Helpers
  function showPage(name) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    if (pages[name]) {
      pages[name].classList.add('active');
    }
  }

  function updateProgress() {
    questionCounter.textContent = `${currentIndex + 1} / ${totalQuestions}`;
    const percent = Math.round(((currentIndex) / totalQuestions) * 100);
    progressFill.style.width = `${percent}%`;
  }

  // Shuffle array using Fisher-Yates algorithm
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Generate quiz questions dynamically based on category (ANTI-CAMPUR)
  function generateQuizQuestions(categoryKey) {
    const category = window.QUIZ_CATEGORIES[categoryKey];
    if (!category) return [];
    
    // Select random questions for the quiz ONLY from the same category
    let selectedQuestions = shuffleArray(category.questions).slice(0, totalQuestions);
    
    return selectedQuestions.map(question => {
      // Get 3 look-alike options ONLY from the same category
      let options = [question.latin]; // Start with correct answer
      
      // Add look-alikes if available (from the same category)
      if (question.lookAlikes && question.lookAlikes.length > 0) {
        // Get all questions from the same category as potential look-alikes
        const sameCategoryQuestions = category.questions.filter(q => q.latin !== question.latin);
        
        // Find matching look-alikes from the same category
        const availableLookAlikes = sameCategoryQuestions.filter(q => 
          question.lookAlikes.includes(q.latin)
        );
        
        // If we have enough look-alikes from the same category, use them
        if (availableLookAlikes.length >= 3) {
          const lookAlikes = shuffleArray(availableLookAlikes.map(q => q.latin)).slice(0, 3);
          options = options.concat(lookAlikes);
        } 
        // If not enough, take what we can and fill with random from same category
        else {
          const lookAlikeNames = availableLookAlikes.map(q => q.latin);
          options = options.concat(lookAlikeNames);
          
          // Fill remaining slots with random options from the same category
          const remainingNeeded = 3 - lookAlikeNames.length;
          if (remainingNeeded > 0) {
            const otherQuestions = sameCategoryQuestions.filter(q => 
              !lookAlikeNames.includes(q.latin) && q.latin !== question.latin
            );
            const randomOptions = shuffleArray(otherQuestions.map(q => q.latin)).slice(0, remainingNeeded);
            options = options.concat(randomOptions);
          }
        }
      }
      
      // If we still don't have enough options, add random ones from the same category
      if (options.length < 4) {
        const remainingNeeded = 4 - options.length;
        const sameCategoryQuestions = category.questions.filter(q => !options.includes(q.latin));
        const randomQuestions = shuffleArray(sameCategoryQuestions).slice(0, remainingNeeded);
        options = options.concat(randomQuestions.map(q => q.latin));
      }
      
      // Ensure we have exactly 4 options
      options = options.slice(0, 4);
      
      // Shuffle options
      options = shuffleArray(options);
      
      // Find correct answer index
      const correctAnswerIndex = options.indexOf(question.latin);
      
      return {
        question: "Aksara di samping dibaca...",
        image: question.image,
        options: options,
        correctAnswerIndex: correctAnswerIndex,
        explanation: `Ini adalah ${question.latin}. ${question.description}`,
        latin: question.latin
      };
    });
  }

  // Learn Functions
  function showCategoryForLearn() {
    console.log('showCategoryForLearn called!');
    currentMode = 'learn';
    showPage('categoryLearn');
  }

  function showLearnPage(categoryKey) {
    currentCategory = categoryKey;
    const category = window.QUIZ_CATEGORIES[categoryKey];
    
    if (!category) {
      alert('Kategori tidak ditemukan!');
      return;
    }
    
    currentCategoryData = category.questions;
    currentIndex = 0;
    
    // Update UI
    learnCategoryTitle.textContent = category.name;
    flashcardTotal.textContent = currentCategoryData.length;
    updateFlashcard();
    
    showPage('learn');
  }

  function updateFlashcard() {
    if (!currentCategoryData || currentIndex < 0 || currentIndex >= currentCategoryData.length) return;
    
    const item = currentCategoryData[currentIndex];
    flashcardCurrent.textContent = currentIndex + 1;
    flashcardImage.src = item.image;
    flashcardImage.alt = item.latin;
    flashcardName.textContent = item.latin;
    flashcardDescription.textContent = item.description;
    
    // Reset flip state
    if (flashcard) {
      flashcard.classList.remove('flipped');
    }
  }

  function flipFlashcardCard() {
    if (flashcard) {
      flashcard.classList.toggle('flipped');
    }
  }

  function nextFlashcardCard() {
    if (currentIndex < currentCategoryData.length - 1) {
      currentIndex++;
      updateFlashcard();
    }
  }

  function prevFlashcardCard() {
    if (currentIndex > 0) {
      currentIndex--;
      updateFlashcard();
    }
  }

  // Quiz Functions
  function showCategoryForQuiz() {
    currentMode = 'quiz';
    showPage('categoryQuiz');
  }

  function startQuiz(categoryKey) {
    currentCategory = categoryKey;
    currentIndex = 0;
    score = 0;
    quizQuestions = generateQuizQuestions(categoryKey);
    
    if (quizQuestions.length === 0) {
      alert('Kategori tidak ditemukan!');
      return;
    }
    
    showPage('quiz');
    renderQuestion();
  }

  function renderQuestion() {
    const q = quizQuestions[currentIndex];
    if (questionText) {
      questionText.textContent = q.question;
    }

    // Render hanya gambar saja (tanpa teks nama aksara)
    if (questionImageContainer) {
      questionImageContainer.innerHTML = `<img src="${q.image}" alt="Aksara Jawa" class="question-image">`;
    }

    renderOptions(q);
    if (feedbackSection) {
      feedbackSection.classList.add('hidden');
    }
    if (nextBtn) {
      nextBtn.disabled = true;
    }

    updateProgress();
  }

  function renderOptions(q) {
    if (!optionsContainer) return;
    
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.type = 'button';
      btn.textContent = opt;
      btn.setAttribute('data-index', idx);
      btn.addEventListener('click', () => handleAnswer(q, btn, idx));
      optionsContainer.appendChild(btn);
    });
  }

  function handleAnswer(q, selectedBtn, selectedIdx) {
    if (!optionsContainer) return;
    
    Array.from(optionsContainer.children).forEach(btn => {
      btn.classList.add('disabled');
      btn.disabled = true;
    });

    const isCorrect = selectedIdx === q.correctAnswerIndex;
    if (isCorrect) {
      selectedBtn.classList.add('correct');
      if (feedbackMessage) {
        feedbackMessage.className = 'feedback-message correct';
        feedbackMessage.textContent = 'Benar!';
      }
      score += 1;
    } else {
      selectedBtn.classList.add('wrong');
      if (feedbackMessage) {
        feedbackMessage.className = 'feedback-message wrong';
        feedbackMessage.textContent = 'Kurang tepat.';
      }
      const correctBtn = optionsContainer.querySelector(`[data-index="${q.correctAnswerIndex}"]`);
      if (correctBtn) correctBtn.classList.add('correct');
    }

    if (feedbackExplanation) {
      feedbackExplanation.textContent = q.explanation;
    }
    if (feedbackSection) {
      feedbackSection.classList.remove('hidden');
    }
    if (nextBtn) {
      nextBtn.disabled = false;
    }
  }

  function gotoNext() {
    if (currentIndex < totalQuestions - 1) {
      currentIndex += 1;
      renderQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    showPage('result');
    if (finalScore) {
      finalScore.textContent = String(score);
    }
    const percent = Math.round((score / totalQuestions) * 100);
    if (scorePercentageText) {
      scorePercentageText.textContent = `${percent}%`;
    }
    
    // Show category name
    const category = window.QUIZ_CATEGORIES[currentCategory];
    if (resultCategory) {
      resultCategory.textContent = `Kategori: ${category ? category.name : 'Tidak diketahui'}`;
    }

    let msg = 'Bagus! Terus belajar.';
    if (percent === 100) msg = 'Sempurna! Hebat sekali.';
    else if (percent >= 80) msg = 'Mantap! Pemahamanmu sangat baik.';
    else if (percent >= 60) msg = 'Lumayan, terus tingkatkan.';
    else msg = 'Tidak apa-apa, coba lagi ya!';
    if (scoreMessage) {
      scoreMessage.textContent = msg;
    }

    if (progressFill) {
      progressFill.style.width = '100%';
    }
    if (questionCounter) {
      questionCounter.textContent = `${totalQuestions} / ${totalQuestions}`;
    }
  }

  function backToLanding() {
    showPage('landing');
    resetState();
  }

  function backToCategoryFromLearn() {
    showPage('categoryLearn');
  }

  function backToCategoryFromQuiz() {
    showPage('categoryQuiz');
  }

  function backToCategoryFromResult() {
    if (currentMode === 'quiz') {
      showPage('categoryQuiz');
    } else {
      showPage('categoryLearn');
    }
  }

  function resetState() {
    currentMode = null;
    currentCategory = null;
    currentCategoryData = null;
    currentIndex = 0;
    score = 0;
    quizQuestions = [];
  }

  // Event listeners for mode selection
  if (learnBtn) {
    learnBtn.addEventListener('click', showCategoryForLearn);
  }
  if (quizBtn) {
    quizBtn.addEventListener('click', showCategoryForQuiz);
  }

  // Event listeners for category selection (Learn)
  if (categoryLearnButtons) {
    categoryLearnButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        showLearnPage(category);
      });
    });
  }

  // Event listeners for category selection (Quiz)
  if (categoryQuizButtons) {
    categoryQuizButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        startQuiz(category);
      });
    });
  }

  // Back button event listeners
  if (backToLandingLearn) {
    backToLandingLearn.addEventListener('click', backToLanding);
  }
  if (backToLandingQuiz) {
    backToLandingQuiz.addEventListener('click', backToLanding);
  }
  if (backToCategoryLearn) {
    backToCategoryLearn.addEventListener('click', backToCategoryFromLearn);
  }
  if (backToCategoryQuiz) {
    backToCategoryQuiz.addEventListener('click', backToCategoryFromQuiz);
  }
  if (backToCategoryResult) {
    backToCategoryResult.addEventListener('click', backToCategoryFromResult);
  }
  if (backToCategories) {
    backToCategories.addEventListener('click', backToCategoryFromResult);
  }

  // Flashcard event listeners
  if (flipFlashcard) {
    flipFlashcard.addEventListener('click', flipFlashcardCard);
  }
  if (flipFlashcardBack) {
    flipFlashcardBack.addEventListener('click', flipFlashcardCard);
  }
  if (prevFlashcard) {
    prevFlashcard.addEventListener('click', prevFlashcardCard);
  }
  if (nextFlashcard) {
    nextFlashcard.addEventListener('click', nextFlashcardCard);
  }
  if (prevFlashcardBack) {
    prevFlashcardBack.addEventListener('click', prevFlashcardCard);
  }
  if (nextFlashcardBack) {
    nextFlashcardBack.addEventListener('click', nextFlashcardCard);
  }

  // Quiz event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', gotoNext);
  }

  // Init
  showPage('landing');
}

// Langsung panggil function
initApp();
