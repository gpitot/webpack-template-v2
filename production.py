#https://gist.github.com/cobyism/4730490#gistcomment-1800932

import os
from os.path import isfile, join
from shutil import copy
import datetime



date = datetime.datetime.now()
TEMPLATE = 'https://stash.9msn.net/scm/cs/chandon.git'

if 'dist' not in os.listdir():
    print('NOT IN DIRECTORY')
    #git needs to be added
    os.system('echo adding git to dist folder')
    
    branch = input('BRANCH : ')
    os.system(f'git clone {TEMPLATE} --branch dist dist')
    
    remote = input('BRANCH REMOTE URL : ')
    os.system(f'cd dist && git remote set-url origin {remote}')


os.system('npx webpack --config webpack.prod.js')


os.system(f'cd dist && git add . && git commit -m \"Released at {date}"\ && git push origin head')