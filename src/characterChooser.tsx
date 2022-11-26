import { useState } from 'preact/hooks';
import './characterChooser.css';

const ZWJ = '\u{200D}';

const ungenderedCharacters = [
  '👱',
  '🧔',
  '🙎',
  '🤦',
  '👳',
  `💆`,
  '🧖',
  '💁',
  '🙇',
  '🧝',
];

const genders = ['🧑', '👨', '👩'];

const genderAppendices = ['', `${ZWJ}♂️`, `${ZWJ}♀️`];

const genderedCharacters = [
  ['🧒', '👦', '👧'],
  ['🧓', '👴', '👵'],
  ['🫅', '🤴', '👸'],
];

const skinTypes = [
  '\u{1f3fb}',
  '\u{1f3fc}',
  '\u{1f3fd}',
  '\u{1f3fe}',
  '\u{1f3ff}',
];

const baldHairStyle = '\u{1F9B2}';
const hairStyles = ['\u{1F9B0}', '\u{1F9B1}', '\u{1F9B3}', baldHairStyle];

type CharacterFactory = (config: {
  skinType: string;
  genderIndex: number;
}) => string;

const xmasCharacterFactory: CharacterFactory = ({ skinType, genderIndex }) => {
  const chars = ['x', '🎅', '🤶'];
  if (genderIndex === 0) return `🧑${skinType}${ZWJ}🎄`;
  return `${chars[genderIndex]}${skinType}`;
};

const characterFactories: CharacterFactory[] = [
  ...hairStyles.map(
    (hairStyle): CharacterFactory =>
      ({ skinType, genderIndex }) =>
        `${genders[genderIndex]}${skinType}${ZWJ}${hairStyle}`,
  ),
  ...genderedCharacters.map(
    (chars): CharacterFactory =>
      ({ skinType, genderIndex }) =>
        `${chars[genderIndex]}${skinType}`,
  ),
  ...ungenderedCharacters.map(
    (char): CharacterFactory =>
      ({ skinType, genderIndex }) =>
        `${char}${skinType}${genderAppendices[genderIndex]}`,
  ),
  xmasCharacterFactory,
];

export function CharacterChooser({
  onSelect,
}: {
  onSelect: (character: string) => void;
}) {
  const [skinTypeIndex, setSkinTypeIndex] = useState(0);
  const skinType = skinTypes[skinTypeIndex];
  const [genderIndex, setGenderIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const selectedCharacter = characterFactories[characterIndex]({
    skinType,
    genderIndex,
  });

  return (
    <div>
      <p>
        {skinTypes.map((skinType, buttonSkinTypeIndex) => (
          <button
            key={skinType}
            data-selected={skinTypeIndex === buttonSkinTypeIndex}
            onClick={() => setSkinTypeIndex(buttonSkinTypeIndex)}
          >
            {`🧑${skinType}${ZWJ}${baldHairStyle}`}
          </button>
        ))}
      </p>

      <p>
        {genders.map((gender, buttonGenderIndex) => (
          <button
            key={gender}
            data-selected={genderIndex === buttonGenderIndex}
            onClick={() => setGenderIndex(buttonGenderIndex)}
          >
            {`${gender}${skinType}`}
          </button>
        ))}
      </p>

      <p class="characterChooser">
        {characterFactories.map((characterFactory, buttonCharacterIndex) => (
          <button
            key={buttonCharacterIndex}
            data-selected={characterIndex === buttonCharacterIndex}
            onClick={() => setCharacterIndex(buttonCharacterIndex)}
          >
            {characterFactory({ skinType, genderIndex })}
          </button>
        ))}
      </p>

      <p>
        <button onClick={() => onSelect(selectedCharacter)}>
          Pick {selectedCharacter}
        </button>
      </p>
    </div>
  );
}
