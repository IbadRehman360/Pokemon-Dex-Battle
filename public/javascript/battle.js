setTimeout(() => {
  const artCards = document.querySelectorAll('.art-card');

  let maxStatSum = 0;
  let winnerIndexes = [];

  artCards.forEach((artCard, i) => {
    const statsElements = artCard.querySelectorAll('.pokemon-stats');
    let statSum = 0;

    statsElements.forEach((statsElement) => {
      const stats = parseInt(statsElement.textContent);
      statSum += stats;
    });

    if (statSum > maxStatSum) {
      maxStatSum = statSum;
      winnerIndexes = [i];
    } else if (statSum === maxStatSum) {
      winnerIndexes.push(i);
    }

    console.log(`Art Card: ${i}`);
    console.log(`Stats Sum: ${statSum}`);
  });

  console.log('Winner Indexes:', winnerIndexes);

  const cardFooterElements = document.querySelectorAll('.card-footer');
  cardFooterElements.forEach((footerElement, i) => {
    if (winnerIndexes.includes(i)) {
      footerElement.textContent = 'WIN';
    } else {
      footerElement.textContent = 'LOSE';
    }
  });
}, 2000);

