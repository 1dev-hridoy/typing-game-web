document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('pause-btn').addEventListener('click', pauseGame);

let timer;
let timeLeft = 60;  // Default time for Word Mode
let score = 0;
let wordCount = 0;
let isGameRunning = false;
let totalCharacters = 0;
let mistakes = 0;
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
let currentWordStart = 0;
let keySound = new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');

// Initialize game state
function startGame() {
    // Get selected mode and difficulty with fallbacks
    let mode = document.getElementById('mode')?.value || 'word';
    let difficulty = document.getElementById('difficulty')?.value || 'medium';
    
    // Set the timer based on selected mode
    timeLeft = mode === 'sentence' ? 120 : 60;  // 2 minutes for Sentence Mode, 1 minute for Word Mode

    // Reset stats
    score = 0;
    wordCount = 0;
    totalCharacters = 0;
    mistakes = 0;
    currentWordStart = Date.now();
    
    // Update UI
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('score').textContent = '0';
    document.getElementById('word-count').textContent = '0';
    document.getElementById('wpm').textContent = '0';
    document.getElementById('accuracy').textContent = '100%';
    
    document.getElementById('word-input').disabled = false;
    document.getElementById('start-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;
    document.getElementById('word-input').focus();

    isGameRunning = true;
    timer = setInterval(updateTimer, 1000);
    showWord();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        // Calculate and update WPM
        let elapsedMinutes = (60 - timeLeft) / 60;
        if (elapsedMinutes > 0) {
            let wpm = Math.round((totalCharacters / 5) / elapsedMinutes);
            document.getElementById('wpm').textContent = wpm;
        }
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    isGameRunning = false;
    document.getElementById('word-input').disabled = true;
    
    // Calculate final stats
    let elapsedMinutes = 1;  // 1 minute for word mode, 2 for sentence mode
    if (document.getElementById('mode').value === 'sentence') elapsedMinutes = 2;
    
    let finalWpm = Math.round((totalCharacters / 5) / elapsedMinutes);
    let accuracy = Math.round(((totalCharacters - mistakes) / totalCharacters) * 100) || 100;
    
    // Update high scores
    let playerName = document.getElementById('username').value || 'Anonymous';
    highScores.push({
        name: playerName,
        score: score,
        wpm: finalWpm,
        accuracy: accuracy,
        date: new Date().toLocaleDateString()
    });
    
    // Sort and keep top 10
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    // Show game over message with stats
    alert(`Game Over!\n\nFinal Score: ${score}\nWPM: ${finalWpm}\nAccuracy: ${accuracy}%`);
    updateHighScoreDisplay();
}

function checkInput() {
    let input = document.getElementById('word-input');
    let typedText = input.value;
    let word = document.getElementById('word-display').textContent;
    
    // Real-time feedback
    if (typedText === word.substring(0, typedText.length)) {
        input.style.backgroundColor = '#e8f5e9';  // Light green for correct
    } else {
        input.style.backgroundColor = '#ffebee';  // Light red for incorrect
        mistakes++;
    }
    
    if (typedText === word) {
        // Play sound
        keySound.play();
        
        // Update stats
        score++;
        wordCount++;
        totalCharacters += word.length;
        
        // Calculate word completion time
        let wordTime = (Date.now() - currentWordStart) / 1000;  // in seconds
        let wordWpm = Math.round((word.length / 5) / (wordTime / 60));
        
        // Update display
        document.getElementById('score').textContent = score;
        document.getElementById('word-count').textContent = wordCount;
        document.getElementById('accuracy').textContent = 
            Math.round(((totalCharacters - mistakes) / totalCharacters) * 100) + '%';
        
        // Clear input and show next word
        input.value = '';
        input.style.backgroundColor = 'white';
        currentWordStart = Date.now();
        showWord();
    }
}

function updateHighScoreDisplay() {
    const highScoreList = document.getElementById('high-scores');
    highScoreList.innerHTML = '';
    
    highScores.forEach((score, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${score.name}: ${score.score} points (${score.wpm} WPM, ${score.accuracy}% accuracy)`;
        highScoreList.appendChild(li);
    });
}

function showWord() {
    let word = generateWord(); // This function should return a random word or sentence
    document.getElementById('word-display').textContent = word;

    document.getElementById('word-input').addEventListener('input', checkInput);
}

function generateWord() {
    const words = [
        'the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for',
    'about', 'above', 'across', 'action', 'active', 'activity', 'add', 'afraid',
    'after', 'again', 'age', 'ago', 'agree', 'air', 'all', 'alone', 'along',
    'already', 'always', 'amount', 'angry', 'another', 'answer', 'appear', 'apple',
    'amazing', 'art', 'attention', 'beautiful', 'believe', 'beyond', 'balance', 
    'brilliant', 'calm', 'celebrate', 'challenge', 'charisma', 'clever', 'comfort', 
    'courage', 'create', 'curious', 'dance', 'daydream', 'delight', 'discovery', 
    'dream', 'eager', 'effort', 'embrace', 'enchanting', 'energy', 'enthusiasm', 
    'excitement', 'explore', 'fascinate', 'fearless', 'flourish', 'freedom', 
    'friendship', 'generous', 'genius', 'genuine', 'grateful', 'growth', 'happiness', 
    'harmony', 'hero', 'honest', 'hopeful', 'hug', 'humble', 'imagine', 'incredible', 
    'inspire', 'intelligent', 'invent', 'joyful', 'kind', 'knowledge', 'laugh', 
    'limitless', 'love', 'loyalty', 'marvelous', 'meaningful', 'miracle', 'motivate', 
    'mystery', 'navigate', 'optimistic', 'passion', 'peaceful', 'perseverance', 
    'positive', 'powerful', 'precious', 'radiance', 'remarkable', 'resilient', 
    'respect', 'revolution', 'serene', 'shine', 'sincere', 'smile', 'spark', 
    'spectacular', 'strength', 'stunning', 'success', 'support', 'talented', 
    'thoughtful', 'thriving', 'trustworthy', 'understand', 'unique', 'universe', 
    'unstoppable', 'victory', 'visionary', 'wisdom', 'wonder', 'worthy', 'youthful', 
    'zen', 'zest', 'achievement', 'adventure', 'affection', 'appreciation', 
    'authentic', 'bravery', 'charm', 'cheerful', 'compassion', 'confidence', 
    'creativity', 'determined', 'dynamic', 'empower', 'encourage', 'enthusiastic', 
    'fantastic', 'fearless', 'flourishing', 'generosity', 'graceful', 'gratitude', 
    'harmonious', 'hilarious', 'illuminate', 'imaginative', 'independent', 
    'innovative', 'intuitive', 'jovial', 'legendary', 'limitless', 'majestic', 
    'magnificent', 'motivated', 'nurturing', 'outstanding', 'passionate', 'playful', 
    'purposeful', 'radiant', 'refreshing', 'reliable', 'resourceful', 'selfless', 
    'sincere', 'spectacular', 'spontaneous', 'thoughtful', 'tranquil', 'uplifting', 
    'vibrant', 'visionary', 'witty', 'wise', 'zealous', 'adore', 'ambition', 'awesome',
    'blessing', 'breathe', 'captivate', 'celebration', 'cherish', 'compelling', 
    'content', 'creed', 'delicate', 'dignity', 'ecstatic', 'empowered', 'euphoria', 
    'exquisite', 'fabulous', 'fantasy', 'fascination', 'flawless', 'fortitude', 
    'gallant', 'grandeur', 'heavenly', 'illustrious', 'infallible', 'inspiring', 
    'introspection', 'jubilation', 'kindhearted', 'luminous', 'melody', 'momentous', 
    'notable', 'opulent', 'phenomenal', 'picturesque', 'quintessential', 'radiant', 
    'refined', 'rejuvenate', 'sacred', 'sapphire', 'serendipity', 'sophisticated', 
    'splendid', 'sublime', 'tranquility', 'twilight', 'unwavering', 'valiant', 
    'vivacious', 'whimsical', 'wondrous', 'zenith', 'allure', 'bountiful', 'brisk', 
    'captivating', 'charitable', 'daring', 'elevate', 'empowerment', 'enrich', 
    'felicity', 'gracious', 'gusto', 'harmony', 'heartfelt', 'illuminate', 'immense', 
    'incomparable', 'indulgence', 'ingenuity', 'invincible', 'jubilant', 'legendary', 
    'limitless', 'majestic', 'mystical', 'noble', 'nurtured', 'optimal', 'perfection', 
    'plentiful', 'pristine', 'radiance', 'rapture', 'resilience', 'reverence', 
    'sensational', 'serene', 'sincerity', 'subliminal', 'symmetry', 'tenacious', 
    'transcend', 'unparalleled', 'valiance', 'vivid', 'witty', 'wholesome', 'zeal'
    ];

    const sentences = [
        "The quick brown fox jumps over the lazy dog.",
    "She sells seashells by the seashore.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "In the end, we only regret the chances we didn't take.",
    "The early bird catches the worm.",
    "Actions speak louder than words.",
    "Better late than never.",
    "A picture is worth a thousand words.",
    "When in Rome, do as the Romans do.",
    "An apple a day keeps the doctor away.",
    "The pen is mightier than the sword.",
    "To err is human; to forgive, divine.",
    "Time flies when you're having fun.",
    "Don't judge a book by its cover.",
    "A watched pot never boils.",
    "Every cloud has a silver lining.",
    "All that glitters is not gold.",
    "Beauty is in the eye of the beholder.",
    "Rome wasn't built in a day.",
    "You can't have your cake and eat it too.",
    "What goes around comes around.",
    "Laughter is the best medicine.",
    "Absence makes the heart grow fonder.",
    "Haste makes waste.",
    "Actions have consequences.",
    "If it ain't broke, don't fix it.",
    "Two heads are better than one.",
    "Every dog has its day.",
    "The grass is always greener on the other side.",
    "A fool and his money are soon parted.",
    "You reap what you sow.",
    "Beggars can't be choosers.",
    "The squeaky wheel gets the grease.",
    "Don't count your chickens before they hatch.",
    "It's always darkest before the dawn.",
    "Don't put all your eggs in one basket.",
    "A rolling stone gathers no moss.",
    "Fortune favors the bold.",
    "The truth will set you free.",
    "You can't make an omelette without breaking eggs.",
    "Where there's smoke, there's fire.",
    "Out of sight, out of mind.",
    "Curiosity killed the cat.",
    "The best things in life are free.",
    "Still waters run deep.",
    "A chain is only as strong as its weakest link.",
    "A bird in the hand is worth two in the bush.",
    "Blood is thicker than water.",
    "Don't cry over spilled milk.",
    "It takes two to tango.",
    "Too many cooks spoil the broth.",
    "You can lead a horse to water, but you can't make it drink.",
    "The apple doesn't fall far from the tree.",
    "Actions speak louder than words.",
    "A penny saved is a penny earned.",
    "Better safe than sorry.",
    "Time is money.",
    "A stitch in time saves nine.",
    "Don't bite the hand that feeds you.",
    "Look before you leap.",
    "All is fair in love and war.",
    "You can't judge a book by its cover.",
    "A friend in need is a friend indeed.",
    "Many hands make light work.",
    "A house divided against itself cannot stand.",
    "A little knowledge is a dangerous thing.",
    "There's no place like home.",
    "If the shoe fits, wear it.",
    "Familiarity breeds contempt.",
    "If you want something done right, do it yourself.",
    "A watchful eye makes a quiet heart.",
    "You can't please everyone.",
    "Live and let live.",
    "Don't put off until tomorrow what you can do today.",
    "Where there's a will, there's a way.",
    "Slow and steady wins the race.",
    "Look before you leap.",
    "You can't have it both ways.",
    "Don't take it for granted.",
    "Make hay while the sun shines.",
    "If it sounds too good to be true, it probably is.",
    "Knowledge is power.",
    "You can't always get what you want.",
    "The road to hell is paved with good intentions.",
    "The early bird catches the worm.",
    "If you can't stand the heat, get out of the kitchen.",
    "The grass is always greener where you water it.",
    "A watched pot never boils.",
    "Nothing ventured, nothing gained.",
    "Good things come to those who wait.",
    "You get what you pay for.",
    "Jack of all trades, master of none.",
    "The road less traveled is often the best.",
    "Time and tide wait for no man.",
    "When the going gets tough, the tough get going.",
    "A bird in the hand is worth two in the bush.",
    "He who laughs last, laughs best.",
    "Let sleeping dogs lie.",
    "The best revenge is massive success.",
    "What doesn't kill you makes you stronger.",
    "You can't always get what you want.",
    "Don't throw the baby out with the bathwater.",
    "What doesn't kill you makes you stronger.",
    "The best is yet to come.",
    "Happiness is a choice.",
    "Dream as if you'll live forever, live as if you'll die today."
    ];

    let mode = document.getElementById('mode').value;

    if (mode === 'sentence') {
        return sentences[Math.floor(Math.random() * sentences.length)];
    } else {
        return words[Math.floor(Math.random() * words.length)];
    }
}

function pauseGame() {
    if (isGameRunning) {
        clearInterval(timer);
        isGameRunning = false;
        document.getElementById('pause-btn').textContent = 'Resume';
    } else {
        timer = setInterval(updateTimer, 1000);
        isGameRunning = true;
        document.getElementById('pause-btn').textContent = 'Pause';
    }
}
