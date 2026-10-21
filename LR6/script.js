const tabsContainer = document.querySelector('#tabs');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

const topLeft = document.querySelector('#top-left');
const topRight = document.querySelector('#top-right');
const bottomRight = document.querySelector('#bottom-right');
const bottomLeft = document.querySelector('#bottom-left');

const topLeftValue = document.querySelector('#top-left-value');
const topRightValue = document.querySelector('#top-right-value');
const bottomRightValue = document.querySelector('#bottom-right-value');
const bottomLeftValue = document.querySelector('#bottom-left-value');

const letterSpacing = document.querySelector('#letter-spacing');
const letterSpacingValue = document.querySelector('#letter-spacing-value');
const textTransform = document.querySelector('#text-transform');

const preview = document.querySelector('#preview');
const previewButton = document.querySelector('#preview-button');
const coordinates = document.querySelector('#coordinates');

const cssCode = document.querySelector('#css-code');
const copyButton = document.querySelector('#copy-button');
const copyMessage = document.querySelector('#copy-message');

const presetForm = document.querySelector('#preset-form');
const presetName = document.querySelector('#preset-name');
const presetError = document.querySelector('#preset-error');

const scrollTopButton = document.querySelector('#scroll-top');

function hideTabs() {
  tabs.forEach(function (tab) {
    tab.classList.remove('active');
  });

  tabContents.forEach(function (content) {
    content.classList.remove('active');
  });
}

function showTab(tabName) {
  const tab = document.querySelector(`[data-tab="${tabName}"]`);
  const content = document.querySelector(`[data-content="${tabName}"]`);

  if (tab) {
    tab.classList.add('active');
  }

  if (content) {
    content.classList.add('active');
  }
}

function updateCssCode() {
  const radius = `${topLeft.value}px ${topRight.value}px ${bottomRight.value}px ${bottomLeft.value}px`;

  cssCode.value =
    `border-radius: ${radius};\n` +
    `letter-spacing: ${letterSpacing.value}px;\n` +
    `text-transform: ${textTransform.value};`;
}

function generateBorderRadius() {
  const topLeftRadius = topLeft.value;
  const topRightRadius = topRight.value;
  const bottomRightRadius = bottomRight.value;
  const bottomLeftRadius = bottomLeft.value;

  const radius = `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`;

  preview.style.borderRadius = radius;

  topLeftValue.textContent = `${topLeftRadius} px`;
  topRightValue.textContent = `${topRightRadius} px`;
  bottomRightValue.textContent = `${bottomRightRadius} px`;
  bottomLeftValue.textContent = `${bottomLeftRadius} px`;

  updateCssCode();
}

function generateLetterSpacing() {
  preview.style.letterSpacing = `${letterSpacing.value}px`;
  letterSpacingValue.textContent = `${letterSpacing.value} px`;
  updateCssCode();
}

function changeTextTransform() {
  preview.style.textTransform = textTransform.value;
  updateCssCode();
}

function copyCSS() {
  navigator.clipboard.writeText(cssCode.value)
    .then(function () {
      copyMessage.textContent = 'CSS-код скопійовано';
    })
    .catch(function () {
      cssCode.select();
      document.execCommand('copy');
      copyMessage.textContent = 'CSS-код скопійовано';
    });
}

function validatePresetName() {
  if (presetName.value.trim() === '') {
    presetName.classList.add('error');
    presetError.textContent = 'Введіть назву пресета';
    return false;
  }

  presetName.classList.remove('error');
  presetError.textContent = '';
  return true;
}

function handlePresetSubmit(event) {
  event.preventDefault();

  if (!validatePresetName()) {
    return;
  }

  console.log(`Пресет: ${presetName.value.trim()}`);
  console.log(cssCode.value);
}

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    topLeft.value = 0;
    topRight.value = 0;
    bottomRight.value = 0;
    bottomLeft.value = 0;
    letterSpacing.value = 0;

    generateBorderRadius();
    generateLetterSpacing();
  }
}

function handleScroll() {
  if (window.scrollY > 300) {
    scrollTopButton.classList.add('visible');
  } else {
    scrollTopButton.classList.remove('visible');
  }
}

tabsContainer.addEventListener('click', function (event) {
  console.log(event.type);
  console.log(event.target);
  console.log(event.currentTarget);

  if (!event.target.classList.contains('tab')) {
    return;
  }

  const tabName = event.target.dataset.tab;

  hideTabs();
  showTab(tabName);
});

topLeft.addEventListener('input', generateBorderRadius);
topRight.addEventListener('input', generateBorderRadius);
bottomRight.addEventListener('input', generateBorderRadius);
bottomLeft.addEventListener('input', generateBorderRadius);

letterSpacing.addEventListener('input', generateLetterSpacing);
textTransform.addEventListener('change', changeTextTransform);

presetName.addEventListener('focus', function () {
  presetName.classList.add('focused');
});

presetName.addEventListener('blur', function () {
  presetName.classList.remove('focused');
  validatePresetName();
});

presetForm.addEventListener('submit', handlePresetSubmit);

document.addEventListener('keydown', handleKeyDown);

copyButton.addEventListener('click', copyCSS);

preview.addEventListener('click', function () {
  console.log('Preview click');
});

previewButton.addEventListener('click', function (event) {
  event.stopPropagation();
  console.log('Button click');
});

preview.addEventListener('mouseover', function () {
  preview.classList.add('hovered');
});

preview.addEventListener('mouseout', function () {
  preview.classList.remove('hovered');
});

preview.addEventListener('mousemove', function (event) {
  coordinates.textContent = `X: ${event.clientX}; Y: ${event.clientY}`;
  console.log(event.pageX);
  console.log(event.pageY);
});

window.addEventListener('scroll', handleScroll);

scrollTopButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

generateBorderRadius();
generateLetterSpacing();
changeTextTransform();
