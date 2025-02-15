import css from '../../lib/css'
import type { Entry } from '../../lib/save-file'

type TagDataType = 'bg' | 'detail' | 'frame'

interface TagData {
  tagData: {
    bg: {
      tag: string
    }
    detail: {
      tag: string
    }
    frame: {
      tag: string
    }
  }
}

interface TagDataElement {
  name: string
  hash: string
}

const styleDetail = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
`

const PlayerTagsEditor = ({ entry }: { entry: Entry }) => {
  const { tagData } = JSON.parse(entry.value as string) as TagData

  const bg = BGS.find((bg) => bg.hash === tagData.bg.tag) || BGS[0]
  const detail =
    DETAILS.find((detail) => detail.hash === tagData.detail.tag) || DETAILS[0]
  const frame =
    FRAMES.find((frame) => frame.hash === tagData.frame.tag) || FRAMES[0]

  const updateTagData = (property: TagDataType, value: string) => {
    entry.value = JSON.stringify({
      tagData: {
        ...tagData,
        [property]: {
          tag: value,
        },
      },
    })
  }

  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `}
    >
      <div
        class={css`
          display: flex;
          gap: 1rem;
          position: sticky;
          top: -1rem;
          background: #18181a;
          padding: 1rem;
        `}
      >
        <div
          class={css`
            position: relative;
            max-width: 160px;
            max-height: 160px;
          `}
        >
          <img src={`/frostnibble/assets/emblem/bg/${bg.name}.jpg`} alt="background" />
          <img
            class={styleDetail}
            src={`/frostnibble/assets/emblem/detail/${detail.name}.png`}
            style={{
              maskImage: `url(/frostnibble/assets/emblem/detail_mask/${detail.name}.png)`,
              maskPosition: 'center',
              maskSize: 'cover',
              maskRepeat: 'no-repeat',
            }}
            alt="detail"
          />
          <img
            class={styleDetail}
            src={`/frostnibble/assets/emblem/frame/${frame.name}.png`}
            style={{
              maskImage: `url(/frostnibble/assets/emblem/detail_mask/${detail.name}.png), linear-gradient(#000 0 0)`,
              maskComposite: 'exclude',
              maskPosition: 'center',
              maskSize: 'cover',
              maskRepeat: 'no-repeat',
            }}
            alt="frame"
          />
        </div>
        <div>
          <h3>Background</h3>
          <p>{bg.name}</p>
          <h3>Detail</h3>
          <p>{detail.name}</p>
          <h3>Frame</h3>
          <p>{frame.name}</p>
        </div>
      </div>

      <TagSelector type="bg" arr={BGS} callback={updateTagData} />

      <TagSelector type="detail" arr={DETAILS} callback={updateTagData} />

      <TagSelector type="frame" arr={FRAMES} callback={updateTagData} />
    </div>
  )
}

const TagSelector = ({
  type,
  arr,
  callback,
}: {
  type: TagDataType
  arr: TagDataElement[]
  callback: (property: TagDataType, hash: string) => void
}) => {
  return (
    <div
      class={css`
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 0.5rem;
      `}
    >
      {arr.map((el) => {
        const name = el.name
        const fileType = type === 'bg' ? 'jpg' : 'png'
        const fileSource = `/frostnibble/assets/emblem/${type}/${name}.${fileType}`

        return (
          <img
            key={name}
            onClick={() => {
              callback(type, el.hash)
            }}
            class={css`
              width: 100%;
            `}
            src={fileSource}
            alt={name}
          />
        )
      })}
    </div>
  )
}

const DETAILS = [
  {
    name: 'butterfly',
    hash: '4080907579',
  },
  {
    name: '3-stars',
    hash: '1671216112',
  },
  {
    name: 'anchor',
    hash: '2213229352',
  },
  {
    name: 'angel-wings',
    hash: '24378910',
  },
  {
    name: 'battlefield-dog-tag',
    hash: '2863864526',
  },
  {
    name: 'bee',
    hash: '3784620829',
  },
  {
    name: 'big-thick-book',
    hash: '1846159064',
  },
  {
    name: 'black-november',
    hash: '4161462718',
  },
  {
    name: 'bop-apex',
    hash: '4036434215',
  },
  {
    name: 'bop-chaser',
    hash: '1514008114',
  },
  {
    name: 'bop-deer',
    hash: '858266763',
  },
  {
    name: 'bop-Interceptor',
    hash: '2442042401',
  },
  {
    name: 'bop-longranger',
    hash: '2109078557',
  },
  {
    name: 'bop-lowflier',
    hash: '917891668',
  },
  {
    name: 'bop-predator',
    hash: '4031159404',
  },
  {
    name: 'bop-stalker',
    hash: '4014900984',
  },
  {
    name: 'c4',
    hash: '2683930401',
  },
  {
    name: 'cat-profile',
    hash: '3420869487',
  },
  {
    name: 'chains',
    hash: '2923659657',
  },
  {
    name: 'cheetah',
    hash: '944773566',
  },
  {
    name: 'che-noah',
    hash: '216500560',
  },
  {
    name: 'claw-marks',
    hash: '3051441250',
  },
  {
    name: 'closed-fist',
    hash: '4166306586',
  },
  {
    name: 'closed-fist-revolutionary',
    hash: '756825431',
  },
  {
    name: 'cowboyhat-and-bandana',
    hash: '1956834512',
  },
  {
    name: 'crocodile',
    hash: '3801457684',
  },
  {
    name: 'delivery',
    hash: '3328861619',
  },
  {
    name: 'destoyed-security-camera',
    hash: '3187831945',
  },
  {
    name: 'dice-logo',
    hash: '1640298601',
  },
  {
    name: 'double-dragon',
    hash: '1070254556',
  },
  {
    name: 'ea-frostbite',
    hash: '223336015',
  },
  {
    name: 'ea-logo',
    hash: '919580545',
  },
  {
    name: 'falling-dominoes',
    hash: '311901076',
  },
  {
    name: 'feather',
    hash: '2361194228',
  },
  {
    name: 'feather-2',
    hash: '2479452814',
  },
  {
    name: 'fist',
    hash: '2364205284',
  },
  {
    name: 'fly',
    hash: '4201732671',
  },
  {
    name: 'geococcyx',
    hash: '3924022394',
  },
  {
    name: 'ghost',
    hash: '717478196',
  },
  {
    name: 'gift',
    hash: '1396890443',
  },
  {
    name: 'glass-pieces',
    hash: '799654273',
  },
  {
    name: 'hood',
    hash: '1447546761',
  },
  {
    name: 'huma-persepolis',
    hash: '4215488733',
  },
  {
    name: 'hunter',
    hash: '2971321919',
  },
  {
    name: 'ikarus_portrait',
    hash: '3089268753',
  },
  {
    name: 'jacknife',
    hash: '70859530',
  },
  {
    name: 'july-revolution',
    hash: '1824461692',
  },
  {
    name: 'key',
    hash: '215898171',
  },
  {
    name: 'leon',
    hash: '2743303796',
  },
  {
    name: 'lion',
    hash: '3559324962',
  },
  {
    name: 'me-logo',
    hash: '1145346986',
  },
  {
    name: 'mercury-god-helmet',
    hash: '927967605',
  },
  {
    name: 'mountain-peak',
    hash: '3814728368',
  },
  {
    name: 'open-hand-with-droplet',
    hash: '940859624',
  },
  {
    name: 'pickpocketing-hand',
    hash: '420718923',
  },
  {
    name: 'pigeon',
    hash: '397901330',
  },
  {
    name: 'pith-helmet',
    hash: '2167573479',
  },
  {
    name: 'queen',
    hash: '459087517',
  },
  {
    name: 'ram',
    hash: '679097399',
  },
  {
    name: 'rat',
    hash: '1485773914',
  },
  {
    name: 'rising-sun',
    hash: '3962444443',
  },
  {
    name: 'shattered_senteniel_armor',
    hash: '2043447743',
  },
  {
    name: 'shattered_senteniel_helmet',
    hash: '333771292',
  },
  {
    name: 'shattered-enforcer-helmet',
    hash: '4084486628',
  },
  {
    name: 'shattered-glass-panel',
    hash: '2648777142',
  },
  {
    name: 'shattered-light-bulb',
    hash: '347023981',
  },
  {
    name: 'shattered-oldschool-footprint',
    hash: '4093061924',
  },
  {
    name: 'shattered-protector-helmet',
    hash: '3606065238',
  },
  {
    name: 'shattered-shock-protector-helmet',
    hash: '380632207',
  },
  {
    name: 'shattered-turret',
    hash: '810778811',
  },
  {
    name: 'shatteret-padlock',
    hash: '948181069',
  },
  {
    name: 'shatteret-shard-building',
    hash: '869446906',
  },
  {
    name: 'singe-bird-wing',
    hash: '1288457120',
  },
  {
    name: 'small-book',
    hash: '2303924955',
  },
  {
    name: 'spider',
    hash: '4036551115',
  },
  {
    name: 'stallion',
    hash: '1823346219',
  },
  {
    name: 'target',
    hash: '4263830103',
  },
  {
    name: 'thumbs-crossed',
    hash: '10278520',
  },
  {
    name: 'thumbs-up',
    hash: '1758633580',
  },
  {
    name: 'tiger',
    hash: '2184593557',
  },
  {
    name: 'two-pigeons',
    hash: '3868061485',
  },
]

const FRAMES = [
  {
    name: 'Elite_Nova_Prime',
    hash: '2573550572',
  },
  {
    name: 'Basic_Arrow',
    hash: '3049936381',
  },
  {
    name: 'Basic_Circle',
    hash: '769109517',
  },
  {
    name: 'Basic_Diamond',
    hash: '3174165210',
  },
  {
    name: 'Basic_Hexagon',
    hash: '4096073036',
  },
  {
    name: 'Basic_Octagon',
    hash: '294373848',
  },
  {
    name: 'Basic_Pentagon',
    hash: '1679314630',
  },
  {
    name: 'Basic_Shield',
    hash: '1311986746',
  },
  {
    name: 'Basic_Square',
    hash: '996320292',
  },
  {
    name: 'Basic_Star',
    hash: '3732465449',
  },
  {
    name: 'Basic_Triangle',
    hash: '54308782',
  },
  {
    name: 'Elite_Arrow',
    hash: '660883694',
  },
  {
    name: 'Elite_Blades',
    hash: '3333905111',
  },
  {
    name: 'Elite_Buzzsaw',
    hash: '742845892',
  },
  {
    name: 'Elite_Circle',
    hash: '2190769590',
  },
  {
    name: 'Elite_Hexagon',
    hash: '3020191357',
  },
  {
    name: 'Elite_Pentagon',
    hash: '3776916059',
  },
  {
    name: 'Elite_Prism',
    hash: '885519364',
  },
  {
    name: 'Elite_Razor_Claw',
    hash: '1798401691',
  },
  {
    name: 'Elite_Shield',
    hash: '3963579151',
  },
  {
    name: 'Elite_Shift',
    hash: '795818827',
  },
  {
    name: 'Elite_Shinobi',
    hash: '3220149199',
  },
  {
    name: 'Elite_Shuriken',
    hash: '2030247615',
  },
  {
    name: 'Elite_The_Hood',
    hash: '224056286',
  },
  {
    name: 'Evolved_Arrow',
    hash: '2758977332',
  },
  {
    name: 'Evolved_Celtic',
    hash: '1001049153',
  },
  {
    name: 'Evolved_Circle',
    hash: '2387001060',
  },
  {
    name: 'Evolved_Cross',
    hash: '3834883717',
  },
  {
    name: 'Evolved_Crusher',
    hash: '3743738366',
  },
  {
    name: 'Evolved_Frame',
    hash: '2398900257',
  },
  {
    name: 'Evolved_Hexagon',
    hash: '1189189939',
  },
  {
    name: 'Evolved_Hexangle',
    hash: '668878093',
  },
  {
    name: 'Evolved_Invincible',
    hash: '2737174629',
  },
  {
    name: 'Evolved_Nova',
    hash: '1120748012',
  },
  {
    name: 'Evolved_Shield',
    hash: '3965951354',
  },
  {
    name: 'Evolved_Square',
    hash: '1345791921',
  },
  {
    name: 'Evolved_Triburst',
    hash: '4277077029',
  },
  {
    name: 'Evolved_Triforce',
    hash: '1143444729',
  },
]

const BGS = [
  {
    name: 'blocks_03',
    hash: '232356850',
  },
  {
    name: 'blocks_01',
    hash: '1950253329',
  },
  {
    name: 'blocks_02',
    hash: '2973486374',
  },
  {
    name: 'crystaline_01',
    hash: '4157003967',
  },
  {
    name: 'crystaline_02',
    hash: '2556762952',
  },
  {
    name: 'crystaline_03',
    hash: '3814603228',
  },
  {
    name: 'crystaline_04',
    hash: '3804099507',
  },
  {
    name: 'crystaline_05',
    hash: '3176491650',
  },
  {
    name: 'crystaline_06',
    hash: '1056070740',
  },
  {
    name: 'crystaline_07',
    hash: '1437370938',
  },
  {
    name: 'crystaline_08',
    hash: '501936717',
  },
  {
    name: 'grid_01',
    hash: '3542490953',
  },
  {
    name: 'grid_02',
    hash: '2645211691',
  },
  {
    name: 'grid_03',
    hash: '1508639107',
  },
  {
    name: 'grid_04',
    hash: '2710233375',
  },
  {
    name: 'grid_05',
    hash: '339938089',
  },
  {
    name: 'hex_01',
    hash: '411643776',
  },
  {
    name: 'hex_02',
    hash: '1118477620',
  },
  {
    name: 'hex_03',
    hash: '866999881',
  },
  {
    name: 'organic_01',
    hash: '2046797545',
  },
  {
    name: 'organic_02',
    hash: '1399141803',
  },
  {
    name: 'organic_03',
    hash: '2463240344',
  },
  {
    name: 'organic_04',
    hash: '3331975617',
  },
  {
    name: 'organic_05',
    hash: '2925611712',
  },
  {
    name: 'spheres_01',
    hash: '3788651620',
  },
  {
    name: 'spheres_02',
    hash: '2332386109',
  },
  {
    name: 'spheres_03',
    hash: '524736417',
  },
  {
    name: 'spheres_04',
    hash: '1183558251',
  },
  {
    name: 'preorder_combat_bg',
    hash: '4189180625',
  },
  {
    name: 'preorder_speedrunner_bg',
    hash: '3357235129',
  },
  {
    name: 'renewed_faith_reward_bg',
    hash: '1310589350',
  },
]

export default PlayerTagsEditor
