<template>
  <div>
    <svg id="layerbox" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <g class="background-svg">
        <pattern id="pattern_svg" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path id="heart" d="M5,2 C0,-4 -3,7 5,10 M5,2 C10,-4, 13,7 5,10" fill="#62C5F1" stroke="0" stroke-linejoin="round" stroke-linecap="round"/>
          <rect x="0" y="0" width="10" height="10" fill="url(#heart)" />
          <rect x="10" y="10" width="10" height="10" fill="#62C5F1" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern_svg)"/>
      </g>
      <g class="body">
        <path d="M0,150 C0,65 120,65 120,150" fill="#62C5F1" stroke="#000" stroke-width="2.5" />
      </g>
      <g class="head">
        <circle cx="60" cy="60" r="40" fill="#62C5F1" stroke="#000" stroke-width="2.5" />
        <g class="eyes">
          <!-- 왼쪽 눈과 눈썹-->
          <!-- <line x1="37" x2="50" y1="46" y2="46" stroke="#000" stroke-width="3" stroke-linecap="round" /> -->
          <circle cx="40" cy="50" r="5" fill="#000" />
          <circle cx="37.5" cy="47" r="1" fill="#fff" stroke-width="0" />
          <!-- 오른쪽 눈과 눈썹 -->
          <!-- <line x1="70" x2="83" y1="46" y2="46" stroke="#000" stroke-width="3" stroke-linecap="round" /> -->
          <circle cx="80" cy="50" r="5" fill="#000" />
          <circle cx="77.5" cy="47" r="1" fill="#fff" stroke-width="0" />
        </g>
        <g class="muzzle">
          <!-- <path d="M61,65 C43,55 43,87 61,73" fill="#fff" stroke="#000" stroke-width="2.5" />
          <path d="M59,65 C77,55 77,87 59,73" fill="#fff" stroke="#000" stroke-width="2.5" /> -->
          <!-- <path d="M60,66 C58.5,61 49,63 49,69 C49,75 58,77 60,71 M60,66 C61.5,61 71,63 71,69 C71,75 62,77 60,71" fill="#fff" /> -->
          <!-- 코의 하얀부분 -->
          <path d="M60,66 C58.5,61 49,63 49,69 C49,75 58,77 60,71 M60,66 C61.5,61 71,63 71,69 C71,75 62,77 60,71" fill="#fff" stroke="#000" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
          <!-- 코 -->
          <polygon
            points="59,63.5,60,63.4,61,63.5,60,65"
            fill="#000"
            stroke="#000"
            stroke-width="5"
            stroke-linejoin="round"
          />
          <!-- 수염 -->
          <!-- 좌 -->
          <path d="M45,66 52,67" fill="#000" stroke="#000" stroke-width="0.5" stroke-linecap="round"/>
          <path d="M44.5,69.5 51.5,69" fill="#000" stroke="#000" stroke-width="0.5" stroke-linecap="round"/>
          <path d="M45,73 52,71" fill="#000" stroke="#000" stroke-width="0.5" stroke-linecap="round"/>
          <!-- 우 -->
          <path d="M75,66 68,67" fill="#000" stroke="#000" stroke-width="0.5" stroke-linecap="round"/>
          <path d="M75.5,69.5 68.5,69" fill="#000" stroke="#000" stroke-width="0.5" stroke-linecap="round"/>
          <path d="M75,73 68,71" fill="#000" stroke="#000" stroke-width="0.5" stroke-linecap="round"/>
        </g>
      </g>
    </svg>
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'SvgApp',
  data: function () {
    return {
      msg: 'svg-app'
    }
  }
}
</script>
