    export function performanceRate(difficultyLevel, priorityLevel, done) {
      let rate = 0;

      if (difficultyLevel === 'medium') {
        rate = rate + 1;
      } else if (difficultyLevel === 'hard') {
        rate = rate + 2;
      };

      if (priorityLevel === 'normal') {
        rate = rate + 1;
      } else if (priorityLevel === 'urgent') {
        rate = rate + 2;
      };

      if(done) {
        rate = rate + 1;
      } else {
        rate = -1;
      }

      console.log(rate,'rate');
      //setTaskRate(rate);
      return rate;

    }