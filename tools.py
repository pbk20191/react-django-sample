import os, asyncio, venv
from argparse import ArgumentParser
from pathlib import Path

async def create_venv(name:str = ".venv"):
    '''
    파이썬 가상환경을 생성합니다.

        - name -- 생성할 파이썬 가상환경 폴더 이름
    '''
    if os.name == 'nt':
        await asyncio.to_thread(lambda: venv.create(name, with_pip=True))
    else:
        process = await asyncio.create_subprocess_exec("python3", "-m", "venv", name, cwd=Path.cwd())
        await process.wait()

async def activate_venv(name:str = ".venv"):
    '''
    파이썬 가상환경을 활성화합니다.

        - name -- 활성화할 파이썬 가상환경 폴더 이름
    '''
    if os.name == 'nt':
        path = Path(".", name, "Scripts", "activate.bat")
        process = await asyncio.create_subprocess_shell(
            cmd=f"cmd /c {path} /d",
            cwd=Path.cwd()
        )
        await process.wait()
    else:
        path = Path(name, "bin", "activate")
        process = await asyncio.create_subprocess_shell(cmd=f"source {path}", cwd=Path.cwd())
        await process.wait()

def python_executable(name:str = ".venv") -> Path: 
    path: Path | None = None
    if os.name == 'nt':
        path = Path(name, "Scripts", "python.exe")
    else:
        path = Path(name, "bin", "python3")
    if path.exists():
        return path
    else:
        raise RuntimeError(f"valid python executable expected on {path}, but can't find one")
    pass

async def setup_python():
    venv_name = ".venv"
    await create_venv(venv_name)
    await activate_venv(venv_name)
    venv_python = python_executable(venv_name)
    process = await asyncio.create_subprocess_exec(venv_python, *["-m", "pip", "install", "-r", "requirements.txt"], cwd=Path.cwd())
    await process.wait()

async def setup_node():
    process = await asyncio.create_subprocess_shell("npm install", cwd=Path("client").absolute())
    await process.wait()

async def setup_all():
    async with asyncio.TaskGroup() as group:
        group.create_task(setup_node())
        group.create_task(setup_python())

def main_command(inputs:[str]):
    root_parser = ArgumentParser(
        description="프로젝트 세팅 및 실행을 도와주는 스크립트입니다."
    )
    group_parser = root_parser.add_subparsers(help="functions")
    command_create = group_parser.add_parser("create", help="create project envrionment")
    
    result = root_parser.parse_args()
    

if __name__ == '__main__':
    asyncio.run(setup_all())