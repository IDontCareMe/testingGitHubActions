[![testingGitHubActionsDeploy](https://github.com/IDontCareMe/testingGitHubActions/actions/workflows/deploy.yml/badge.svg?branch=main&event=push)](https://github.com/IDontCareMe/testingGitHubActions/actions/workflows/deploy.yml)

# testingGitHubActions
This repo was created just for learning and testing GitHub Actions  
https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions

## Пусть тут будет шпаргалка по GitHub Actions :octocat:
### Чуть-чуть терминологии:  
```
workflow - рабочий процесс. Состоит из одной или нескольких работ (job);  
jobs - работы. В свою очередь состоят из шагов (step);  
step - шаги - элементарные действия (Actions), выполняющиеся в каждой работе;  
event - события, влияющие на запуск workflow;  
```

### Создание рабочего процесса
Для создания какого либо "Action" во-первых необходимо добавить в директории **.github/workflows YML** файл произвольного названия:  
```.github/workflows/file_name.yml```

Комментарии пишутся через **"#"**
```
# Однострочный комментарий 
```

Во-вторых настроить сам процесс для чего определить в созданном файле название процесса (**name**) - может быть любым, но лучше в одно слово, событие, которое будет запускать этот процесс (**on**), а также список работ, которые будет выполнять данный процесс (**jobs**):  
```
ВНИМАНИЕ! ЗДЕСЬ И ДАЛЕЕ СОБДЮДАЕМ ТАБУЛЯЦИЮ!!!
```
```YML
# Однострочный комментарий 
name: name_of_workflow
on:
  push:
    branches: ["main"]
    
jobs:
  ...
```
*Квадратные скобки у "main" означают, что можно указать несколько веток через запятую, тогда Action будет выполнятся и при пуше в эти ветки.*

Далее необходимо задать имя для работы. Для работы не нужно указывать ключевое слово **"name:"**, просто имя и двоеточее:
```YML
jobs:
  some_cool_job:
```
Также для каждой работы необходимо указать в какой среде она будет выполняться (Linux, Windows, e.t.c.) через ключевое слово **"runs-on:"**
```YML
jobs:
  some_cool_job:
    runs-on: ubuntu-latest
```
*В примере выше выполнение идёт на полследней версии Ubuntu* 

Теперь самое время описать шаги, которые будут выполняться для каждой работы. Для этого после ключевого слова **"steps:"** прописываются имя шага (**"- name:"**) и действия, которые выполняются в данном шаге. Если необходимо использовать готовый скрипт, пишется ключевое слово **"uses:"**, если необходимо использовать, например, bash-скрипт, то ключевое слово **"run:"**
```YML
# Однострочный комментарий 
name: name_of_workflow
on:
  push:
    branches: ["main"]
    
jobs:
  # Первый job
  some_cool_job:
    runs-on: ubuntu-latest
    
    steps:
      # Checkout. Загружаем файлы из репозитория в контейнер
      - name: Load files from repo
        uses: actions/checkout@v3
      
      # Вывести содержимое рабочей директории
      - name: Print list of files
        run: ls -lha
      
      # Вывести сообщение в консоль
      - name: Print hello message
        run: echo "Hello!"
```
*uses: actions/checkout@v3 делает pull из репозитория в рабочую папку контейнера. Обычно это самый первый Action, который следует выполнить*

По умолчанию **"run:"** и **"uses:"** выполняют команду только в одну строку или только одну команду. Если нужно выполнить в **"run:"** несколько команд, необходимо записать их следующим образом, используя символ **"|"**:
```YML
      - name: Multi line step
        run: |
          echo "Создаём файл myFile.txt"
          touch myFile.txt
```

Если нужно указать дополнитьельные параметры у **"uses:"**, необходимо использовать ключевое слово **"with:"**
```YML
...
 - name: Minify JS & CSS
        uses: nizarmah/auto-minify@v2.1
        with:
          maxdepth: 2
          overwrite: true
...
```
В примере выше для Экшена **"nizarmah/auto-minify"** используются параметры **"maxdepth"** и **"overwrite"**

Если необходимо выполнить какое-то действие в разных окружениях или на разных версиях языка, сначала необходимо определить стратегию выполнения при помощи ключевого слова **"strategy:"**
