from API.forms import UserCreationForm


def Register(data):
    form = UserCreationForm(data)
    if form.is_valid():
        form.save()
    return True
