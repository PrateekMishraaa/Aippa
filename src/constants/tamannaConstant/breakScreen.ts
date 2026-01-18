// Tamanna break screen data

import AR_Que from "/careerComponents/tamannaTest/AR_Que.webp";
import AR_Ans from "/careerComponents/tamannaTest/AR_Ans.webp";
import SP_Que from "/careerComponents/tamannaTest/SP_Que.webp";
import SP_Ans from "/careerComponents/tamannaTest/SP_Ans.webp";

type BreakScreenTypes = {
	title: string;
	description: string;
}[];

const breakScreen: BreakScreenTypes = [
	{
		title: "Language Aptitude Test",
		description: `
      <div>
        <h2>Instructions</h2>
        <p>
          This test consists of three parts: <strong>Part I</strong>, <strong>Part II</strong>, and <strong>Part III</strong>.
        </p>
        
        <h3>Part I</h3>
        <p>
          Part I has 10 items (Questions 1–10). Look at the word in capital letters, and choose the option 
          (<strong>A</strong>, <strong>B</strong>, <strong>C</strong>, <strong>D</strong>) that means the same as the given word.
        </p>
        <blockquote>
          <p><strong>Example:</strong></p>
          <p>MEMORABLE:</p>
          <ul>
            <li>A. Unforgettable</li>
            <li>B. Interesting</li>
            <li>C. Attractive</li>
            <li>D. Eventful</li>
          </ul>
          <p><strong>Correct Answer:</strong> A (MEMORABLE means the same as UNFORGETTABLE).</p>
        </blockquote>

        <h3>Part II</h3>
        <p>
          Part II has 10 items (Questions 11–20). Each item includes a series of words. Choose the word that is correctly spelt.
        </p>
        <blockquote>
          <p><strong>Example:</strong></p>
          <p>
            A. Goverment<br />
            B. Government<br />
            C. Gornment<br />
            D. Governmant
          </p>
          <p><strong>Correct Answer:</strong> B (Government is the correct spelling).</p>
        </blockquote>

        <h3>Part III</h3>
        <p>
          Part III has 10 items (Questions 21–30). Read the proverb/idiom and select the correct meaning from the options.
        </p>
        <blockquote>
          <p><strong>Example:</strong></p>
          <p>
            Cry over spilt milk.<br />
            A. Getting out of difficulty.<br />
            B. Holding hatred against someone.<br />
            C. Complaining about a loss from the past.<br />
            D. Anticipating about the future and crying.
          </p>
          <p><strong>Correct Answer:</strong> C ("Cry over spilt milk" means to complain about a loss from the past).</p>
        </blockquote>
        
        <p>You will have <strong>10 minutes</strong> to complete this test. Work as quickly as possible.</p>
      </div>
    `,
	},
	{
		title: "Abstract Reasoning Test",
		description: `
      <div>
        <h2>Instructions</h2>
        <p>
          This test consists of 30 questions. Each question has a <strong>Question Figure</strong> followed by a set of <strong>Answer Options</strong>. 
          Select the correct answer based on the pattern or sequence observed in the figure.
        </p>
        <h3>How to Answer:</h3>
        <ul>
          <li>Examine the <strong>Question Figure</strong>.</li>
          <li>Analyze the <strong>Answer Figures</strong> provided below.</li>
          <li>Select the correct answer by clicking the appropriate option.</li>
        </ul>
        <blockquote>
          <p><strong>Example:</strong></p>
          <p><strong>Problem Figure:</strong></p>
          <img src= ${AR_Que} alt="Example Problem Figure" />
          <p><strong>Answer Figures:</strong></p>
          <img src=${AR_Ans} alt="Example Answer Figures" />
          <p>
            Based on the observations, only option <strong>A</strong> correctly forms the Problem Figure. Therefore, option <strong>A</strong> is the correct answer.
          </p>
        </blockquote>

        <p>You will have <strong>10 minutes</strong> to complete this test. Work as quickly as possible.</p>
      </div>
    `,
	},
	{
		title: "Verbal Reasoning Test",
		description: `
    <div>
      <h2>Instructions</h2>
      <p>
        This test consists of two parts: <strong>Part I</strong> and <strong>Part II</strong>.
      </p>
      
      <h3>Part I: Completing Word Pairs</h3>
      <p>
        In this section, you will find 15 sentences. Each sentence contains two pairs of words, but a word from the second pair is missing. 
        Select the correct option to complete the pair.
      </p>
      <blockquote>
        <p><strong>Example:</strong></p>
        <p>Water is to Tank as Money is to:</p>
        <ul>
          <li>A. Spend</li>
          <li>B. Bank</li>
          <li>C. Gold</li>
          <li>D. Manager</li>
        </ul>
        <p><strong>Correct Answer:</strong> B (Money is stored in a bank, just as water is stored in a tank).</p>
      </blockquote>
      
      <h3>Part II: Matching Word Pairs</h3>
      <p>
        Each sentence includes two pairs of words, but one word from each pair is missing. Choose the correct option to complete both pairs.
      </p>
      <blockquote>
        <p><strong>Example:</strong></p>
        <p>________ is to Red as Earth is to ________</p>
        <ul>
          <li>A. Mars — Blue</li>
          <li>B. Jupiter — Orange</li>
          <li>C. Mercury — Brown</li>
          <li>D. Saturn — Yellow</li>
        </ul>
        <p><strong>Correct Answer:</strong> A (Mars is the 'Red Planet,' and Earth is called the 'Blue Planet').</p>
      </blockquote>
      
      <p>You will have <strong>10 minutes</strong> to complete this test. Work as quickly as possible.</p>
    </div>
  `,
	},
	{
		title: "Mechanical Reasoning Test",
		description: `
    <div>
      <h2>Instructions</h2>
      <p>
        This test consists of 30 questions. Each question involves reasoning based on figures and their relationships.
        Carefully examine the figures in the question, then choose the correct answer from the given options.
      </p>
      <h3>How to Answer:</h3>
      <ul>
        <li>Analyze the <strong>Question Figures</strong>.</li>
        <li>Evaluate the options based on the problem statement.</li>
        <li>Select the correct option and ensure it is selected before moving to the next question.</li>
      </ul>
      <blockquote>
        <p><strong>Example:</strong></p>
        <p>Effort is to Pulley as Load is to:</p>
        <ul>
        <li>A. Force</li>
        <li>B. Rope</li>
        <li>C. Pulley</li>
        <li>D. Gravity</li>
        </ul>
        <p><strong>Correct Answer:</strong> B (Effort is applied to the pulley through the rope, just as the load is supported by the rope).</p>
      </blockquote>

      <p>You will have <strong>10 minutes</strong> to complete this test. Work as quickly as possible.</p>
    </div>
  `,
	},
	{
		title: "Numerical Aptitude Test",
		description: `
      <div>
        <h2>Instructions</h2>
        <p>
          This test consists of 30 questions focusing on <strong>Numerical Reasoning</strong>. Each question requires analyzing the given numbers, patterns, or relationships and selecting the correct answer.
        </p>
        
        <h3>How to Answer:</h3>
        <ul>
          <li>Read the question carefully.</li>
          <li>Analyze the relationship or pattern in the given numbers.</li>
          <li>Select the option that best fits the observed pattern or calculation.</li>
        </ul>
        <blockquote>
          <p><strong>Example:</strong></p>
          <p>
            What is the next number in the sequence? 2, 4, 8, 16, __.
          </p>
          <ul>
            <li>A. 20</li>
            <li>B. 24</li>
            <li>C. 32</li>
            <li>D. 64</li>
          </ul>
          <p><strong>Correct Answer:</strong> C (Each number doubles the previous one: 2 × 2 = 4, 4 × 2 = 8, and so on).</p>
        </blockquote>
        
        <p>You will have <strong>10 minutes</strong> to complete this section. Use a logical approach to solve the problems quickly.</p>
      </div>
    `,
	},
	{
		title: "Spatial Aptitude Test",
		description: `
      <div>
        <h2>Instructions</h2>
        <p>
          This test consists of two parts: <strong>Part I</strong> and <strong>Part II</strong>. Part I has 20 questions. 
          Each question contains a <strong>Problem Figure</strong> followed by four <strong>Answer Figures</strong> labeled A, B, C, and D. 
          Only one of these is correct. Your task is to identify the correct answer and select it.
        </p>
        <h3>How to Answer:</h3>
        <ul>
          <li>Examine the <strong>Problem Figure</strong> carefully.</li>
          <li>Analyze the <strong>Answer Figures</strong> below and identify the correct one.</li>
          <li>Select the answer by clicking the appropriate option (A, B, C, or D).</li>
        </ul>
        <blockquote>
          <p><strong>Example:</strong></p>
          <p><strong>Problem Figure:</strong></p>
          <img src= ${SP_Que} alt="Example Problem Figure" />
          <p><strong>Answer Figures:</strong></p>
          <img src=${SP_Ans} alt="Example Answer Figures" />
          <p>
            Only option <strong>A</strong> forms the correct sequence to match the Problem Figure. 
            Therefore, option <strong>A</strong> is the correct answer.
          </p>
        </blockquote>
        <p>You will have <strong>10 minutes</strong> to complete this test. Work quickly and accurately.</p>
      </div>
    `,
	},
	{
		title: "Perceptual Aptitude Test",
		description: `
      <div>
        <h2>Instructions</h2>
        <p>This test consists of <strong>60 questions</strong> designed to evaluate your ability to quickly and accurately compare numbers or letter-number combinations.</p>
        
        <h3>How to Answer:</h3>
        <ul>
          <li>You will be shown a <strong>Test Item</strong> (a number, letter, or combination).</li>
          <li>Four <strong>Answer Options</strong> will be provided. Only one of them matches the Test Item exactly.</li>
          <li>Analyze the options and select the one that matches the Test Item correctly.</li>
        </ul>
        <blockquote>
          <p><strong>Example:</strong></p>
          <p>Test Item: <strong>39461084</strong></p>
          <ul>
            <li>A. 39416084</li>
            <li>B. 39461040</li>
            <li>C. 39461084</li>
            <li>D. 39461480</li>
          </ul>
          <p><strong>Correct Answer:</strong> C (This option matches the Test Item exactly).</p>
        </blockquote>
        
        <p>You will have <strong>10 minutes</strong> to complete this test. Work quickly and focus on accuracy.</p>
      </div>
    `,
	},
];

export const subTestName: string[] = [
	"Language Aptitude",
	"Abstract Reasoning",
	"Verbal Reasoning",
	"Mechanical Reasoning",
	"Numerical Aptitude",
	"Spatial Aptitude",
	"Perceptual Aptitude",
];

export default breakScreen;
