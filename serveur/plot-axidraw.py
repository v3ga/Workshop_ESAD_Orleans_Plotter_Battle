import sys
from pyaxidraw import axidraw

ad = axidraw.AxiDraw()
ad.interactive()
ad.connect()

# Exemple : on suppose que le JS envoie un SVG temporaire
svg_file = sys.argv[1]
ad.plot_setup(svg_file)
ad.plot_run()
ad.disconnect()
