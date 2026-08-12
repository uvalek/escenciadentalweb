"""Genera los logos del sitio a partir del original del cliente
(img/esenciadentalogo.svg). Ejecutar desde la carpeta del sitio."""
import re, xml.etree.ElementTree as ET

SRC='img/esenciadentalogo.svg'; NS='http://www.w3.org/2000/svg'
ET.register_namespace('', NS)
raw=open(SRC,encoding='utf-8').read()

NEGRO, TURQ, AZULCL, FONDO_OSCURO = '#0F1518', '#6BC2D4', '#B0DBEB', '#0B1013'

clases=dict(re.findall(r'\.(cls-\d+)\s*\{\s*fill:\s*(#[0-9a-fA-F]{6});',raw))
oscuras=[c for c,v in clases.items() if int(v[1:3],16)<60]
claras =[c for c,v in clases.items() if int(v[1:3],16)>200 and int(v[3:5],16)>200]
azulcl =[c for c,v in clases.items() if v.lower()=='#b0dbeb']
turq   =[c for c in clases if c not in oscuras and c not in claras and c not in azulcl]
assert len(oscuras)+len(claras)+len(turq)+len(azulcl)==len(clases)

def hoja(negro, hueco):
    o=lambda l: sorted(l,key=lambda x:int(x[4:]))
    l =[f'.{c}{{fill:{negro}}}'  for c in o(oscuras)]
    l+=[f'.{c}{{fill:{hueco}}}'  for c in o(claras)]
    l+=[f'.{c}{{fill:{TURQ}}}'   for c in o(turq)]
    l+=[f'.{c}{{fill:{AZULCL}}}' for c in o(azulcl)]
    l+=[f'.cls-negro{{fill:{negro}}}']
    return '\n      '.join(l)

arbol=ET.fromstring(raw)
grupo=arbol.find(f'.//{{{NS}}}g[@id="Objeto_generativo"]')
padres={h:p for p in arbol.iter() for h in p}
arco=grupo.find(f'{{{NS}}}path[@class="cls-12"]')
diente=next(g for g in arbol.iter(f'{{{NS}}}g') if g.find(f'{{{NS}}}path[@class="cls-20"]') is not None)
padres[diente].remove(diente); grupo.remove(arco)

marca=[arco,diente]
# el remate de la "g" de "Odontologia" vive fuera del grupo; el <defs> original
# NO se copia, o su hoja de estilos pisaria a la nuestra
texto=list(grupo)+[e for e in arbol if e is not grupo and not e.tag.endswith('}defs')]
assert len(texto)==len(list(grupo))+1

def negrear(el):
    if not el.tag.endswith('}g') and not el.get('class'): el.set('class','cls-negro')
    for h in el: negrear(h)
for e in texto: negrear(e)

ser=lambda els:'\n    '.join(ET.tostring(e,encoding='unicode').replace(f' xmlns="{NS}"','').strip() for e in els)
MARCA,TEXTO=ser(marca),ser(texto)

# cajas reales medidas en el navegador:
#   marca  x 74..360  y  46..277
#   texto  x 18..416  y 288..368
SM,ST,HUECO,ALTO=0.45,0.85,22,104
mx,my=-SM*74,-SM*46
tx,ty=(SM*286+HUECO)-ST*18,(ALTO-ST*80)/2-ST*288
ANCHO=round(SM*286+HUECO+ST*398)

NOTA=('Generado con gen-logos.py a partir de img/esenciadentalogo.svg, el original\n'
      '       del cliente. Los huecos de las letras chicas de "Odontologia Familiar"\n'
      '       son formas encimadas, no calados: por eso van pintados del color del\n'
      '       fondo sobre el que se usa cada version.')

def escribir(ruta,cuerpo,vb,estilos,titulo):
    open(ruta,'w',encoding='utf-8').write(
f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="{titulo}">
  <title>{titulo}</title>
  <!-- {NOTA} -->
  <defs>
    <style>
      {estilos}
    </style>
  </defs>
{cuerpo}
</svg>
''')

horiz=f'''  <g transform="translate({mx:.2f},{my:.2f}) scale({SM})">
    {MARCA}
  </g>
  <g transform="translate({tx:.2f},{ty:.2f}) scale({ST})">
    {TEXTO}
  </g>'''

escribir('img/logo.svg',        horiz, f'0 0 {ANCHO} {ALTO}', hoja(NEGRO,'#FFFFFF'),        'Esencia Dental — Odontología Familiar')
escribir('img/logo-blanco.svg', horiz, f'0 0 {ANCHO} {ALTO}', hoja('#FFFFFF',FONDO_OSCURO), 'Esencia Dental — Odontología Familiar')
escribir('img/logo-vertical.svg','  '+MARCA+'\n  '+TEXTO, '0 0 440 390', hoja(NEGRO,'#FFFFFF'), 'Esencia Dental — Odontología Familiar')
escribir('favicon.svg',         '  '+MARCA, '60 4 314 314', hoja(NEGRO,'#FFFFFF'), 'Esencia Dental')
print(f'logo horizontal {ANCHO}x{ALTO} ({ANCHO/ALTO:.2f}:1)')
