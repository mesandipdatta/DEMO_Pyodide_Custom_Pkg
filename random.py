import sys
import inspect

module = inspect.getmodule(sys)
print(module)