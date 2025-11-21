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
    
    // Update counter
    flashcardCurrent.textContent = currentIndex + 1;
    
    // Update image
    flashcardImage.src = item.image;
    flashcardImage.alt = `Aksara ${item.latin}`;
    
    // Update back side
    flashcardName.textContent = item.latin;
    flashcardDescription.textContent = item.description;
    
    // Reset flip state
    flashcard.classList.remove('flipped');
  }

  function flipCard() {
    flashcard.classList.toggle('flipped');
  }

  function nextFlashcardFunc() {
    if (currentIndex < currentCategoryData.length - 1) {
      currentIndex++;
      updateFlashcard();
    }
  }

  function prevFlashcardFunc() {
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
    quizQuestions = generateQuizQuestions(categoryKey);
    currentIndex = 0;
    score = 0;
    
    if (quizQuestions.length === 0) {
      alert('Tidak ada soal yang tersedia untuk kategori ini!');
      return;
    }
    
    showQuestion();
    updateProgress();
    showPage('quiz');
  }

  function showQuestion() {
    if (currentIndex >= quizQuestions.length) {
      showResults();
      return;
    }
    
    const question = quizQuestions[currentIndex];
    
    // Update question text
    questionText.textContent = question.question;
    
    // Clear previous image
    questionImageContainer.innerHTML = '';
    
    // Create and add new image
    const img = document.createElement('img');
    img.src = question.image;
    img.alt = 'Aksara yang harus dikenali';
    img.className = 'question-image';
    img.loading = 'lazy'; // Improve loading performance
    questionImageContainer.appendChild(img);
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create new options
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'option-btn';
      button.textContent = option;
      button.setAttribute('data-index', index);
      button.addEventListener('click', () => selectOption(index));
      optionsContainer.appendChild(button);
    });
    
    // Hide feedback section
    feedbackSection.classList.add('hidden');
    
    // Enable all options
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.remove('disabled', 'selected', 'correct', 'wrong');
    });
  }

  function selectOption(selectedIndex) {
    if (currentIndex >= quizQuestions.length) return;
    
    const question = quizQuestions[currentIndex];
    const isCorrect = selectedIndex === question.correctAnswerIndex;
    
    // Disable all options
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.add('disabled');
    });
    
    // Highlight selected option
    const selectedButton = document.querySelector(`.option-btn[data-index="${selectedIndex}"]`);
    if (selectedButton) {
      selectedButton.classList.add('selected');
    }
    
    // Show feedback
    feedbackSection.classList.remove('hidden');
    feedbackMessage.textContent = isCorrect ? 'Benar! 🎉' : 'Salah! 😢';
    feedbackMessage.className = `feedback-message ${isCorrect ? 'correct' : 'wrong'}`;
    feedbackExplanation.textContent = question.explanation;
    
    // Update score
    if (isCorrect) {
      score++;
    }
    
    // Highlight correct/wrong answers
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((button, index) => {
      if (index === question.correctAnswerIndex) {
        button.classList.add('correct');
      } else if (index === selectedIndex && !isCorrect) {
        button.classList.add('wrong');
      }
    });
  }

  function nextQuestion() {
    currentIndex++;
    if (currentIndex < quizQuestions.length) {
      showQuestion();
      updateProgress();
    } else {
      showResults();
    }
  }

  function showResults() {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Update result UI
    finalScore.textContent = score;
    scorePercentageText.textContent = `${percentage}%`;
    
    // Set appropriate message
    let message = '';
    if (percentage >= 80) {
      message = 'Luar biasa! Kamu benar-benar menguasai materi ini.';
    } else if (percentage >= 60) {
      message = 'Bagus! Terus belajar untuk meningkatkan pemahamanmu.';
    } else {
      message = 'Jangan menyerah! Pelajari lagi materinya dan coba lagi.';
    }
    scoreMessage.textContent = message;
    
    // Set category name
    const category = window.QUIZ_CATEGORIES[currentCategory];
    if (category) {
      resultCategory.textContent = `Kategori: ${category.name}`;
    }
    
    showPage('result');
  }

  // Event Listeners
  if (learnBtn) learnBtn.addEventListener('click', showCategoryForLearn);
  if (quizBtn) quizBtn.addEventListener('click', showCategoryForQuiz);

  // Category selection for Learn
  categoryLearnButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      if (category) showLearnPage(category);
    });
  });

  // Category selection for Quiz
  categoryQuizButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      if (category) startQuiz(category);
    });
  });

  // Back buttons
  if (backToLandingLearn) backToLandingLearn.addEventListener('click', () => showPage('landing'));
  if (backToLandingQuiz) backToLandingQuiz.addEventListener('click', () => showPage('landing'));
  if (backToCategoryLearn) backToCategoryLearn.addEventListener('click', showCategoryForLearn);
  if (backToCategoryQuiz) backToCategoryQuiz.addEventListener('click', showCategoryForQuiz);
  if (backToCategoryResult) backToCategoryResult.addEventListener('click', showCategoryForQuiz);
  if (backToCategories) backToCategories.addEventListener('click', () => {
    if (currentMode === 'learn') {
      showCategoryForLearn();
    } else {
      showCategoryForQuiz();
    }
  });

  // Flashcard controls
  if (flipFlashcard) flipFlashcard.addEventListener('click', flipCard);
  if (flipFlashcardBack) flipFlashcardBack.addEventListener('click', flipCard);
  if (prevFlashcard) prevFlashcard.addEventListener('click', prevFlashcardFunc);
  if (nextFlashcard) nextFlashcard.addEventListener('click', nextFlashcardFunc);
  if (prevFlashcardBack) prevFlashcardBack.addEventListener('click', prevFlashcardFunc);
  if (nextFlashcardBack) nextFlashcardBack.addEventListener('click', nextFlashcardFunc);

  // Quiz controls
  if (nextBtn) nextBtn.addEventListener('click', nextQuestion);

  // Keyboard navigation for flashcards
  document.addEventListener('keydown', (e) => {
    // Only handle key events when on learn page
    if (!pages.learn.classList.contains('active')) return;
    
    switch(e.key) {
      case 'ArrowLeft':
        prevFlashcardFunc();
        break;
      case 'ArrowRight':
        nextFlashcardFunc();
        break;
      case ' ':
        e.preventDefault();
        flipCard();
        break;
    }
  });

  // Prevent zoom on double tap for mobile
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // Initialize app
  showPage('landing');
}

// Wait for DOM to load completely
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Handle potential issues with window.QUIZ_CATEGORIES
window.addEventListener('load', function() {
  if (typeof window.QUIZ_CATEGORIES === 'undefined') {
    console.error('QUIZ_CATEGORIES is not defined. Check if data.js is loaded correctly.');
  }
});