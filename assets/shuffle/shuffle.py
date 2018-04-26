"""Module for Shuffling a Playlist"""

from random import getrandbits, randint, random
from time import gmtime, strftime


def print_shuffle_details(init_post, new_pos, diff_pos=None):
    """
    Prints the meta data of the current shuffle. Can be simplified if playlist is made into a class.
    :param (int|basestring) init_post: Initial position in the playlist.
    :param (int|basestring) new_pos: Shuffled position in the playlist.
    :param (int|basestring) diff_pos: Distance between shuffled position and initial position.
    :return:
    """
    timestamp = strftime("%Y-%m-%d %H:%M:%S", gmtime())
    if diff_pos is not None:
        print(timestamp + " : \tStarting from track {0}, shuffled to track {1}, a difference of {2} track(s).".format(init_post, new_pos, diff_pos))
    else:
        print(timestamp + " : \tStarting from track {0}, shuffled to track {1}.".format(init_post, new_pos))


def shuffle_v1(playlist):
    """
    Simply plays the following track in-order, essentially forgetting to "shuffle" anything.
    :param (dict) playlist: Dictionary of track information, including the track data.
    :return (int): Track number to shuffle to.
    """
    current_position = int(playlist['Meta Data']['Current Position'])
    playlist_length = int(playlist['Meta Data']['Length'])
    return (current_position + 1) % playlist_length


def shuffle_v1_1(playlist):
    """
    Generate an index within the playlist. When the current track is chosen, reshuffle.
    :param (dict) playlist:
    :return (int): Track number to shuffle to.
    """
    current_position = int(playlist['Meta Data']['Current Position'])
    playlist_length = int(playlist['Meta Data']['Length'])
    shuffle_position = current_position
    while shuffle_position == current_position:
        shuffle_position = randint(0, playlist_length - 1)
    return shuffle_position


def shuffle_v2(playlist):
    """
    Randomly selects an index, and reshuffles depending on the delta index.
    :param (dict) playlist: Dictionary of track information, including the track data.
    :return (int): Track number to shuffle to.
    """
    current_position = int(playlist['Meta Data']['Current Position'])
    playlist_length = int(playlist['Meta Data']['Length'])
    shuffle_position = current_position

    while shuffle_position == current_position:
        shuffle_position = randint(0, playlist_length - 1)
        delta_position = abs(shuffle_position - current_position)
        if playlist_length > 2 and delta_position == 1 and random() < 0.5:
            shuffle_position = randint(0, playlist_length - 1)
        elif playlist_length > 2 and delta_position == 2 and random() < 0.25:
            shuffle_position = randint(0, playlist_length - 1)
    return shuffle_position


def shuffle_v2_1(playlist):
    """
    Implements v2, but generates the entire permutation before playing anything. This reduces the
    disproportionate wait times between shuffles by offloading it to the initial playlist load.
    Users won't really care if it takes an extra second to load a CD, but they will care if there's
    a load time between tracks.
    :param (dict) playlist: Dictionary of track information, including the track data.
    :return (list): Permutation of tracks to shuffle through.
    """
    track_permutation = []

    current_position = int(playlist['Meta Data']['Current Position'])
    playlist_length = int(playlist['Meta Data']['Length'])

    if playlist_length in [0, 1]:
        return [0]  # An empty, or small playlist

    while len(track_permutation) < playlist_length:
        shuffle_position = randint(0, playlist_length - 1)
        delta_position = abs(shuffle_position - current_position)
        if shuffle_position not in track_permutation:
            if playlist_length > 2 and delta_position == 1 and random() < 0.5:
                shuffle_position = randint(0, playlist_length - 1)
            elif playlist_length > 2 and delta_position == 2 and random() < 0.25:
                shuffle_position = randint(0, playlist_length - 1)
            track_permutation.append(shuffle_position)

    return track_permutation


if __name__ == "__main__":
    """Test the Various Shuffle Versions"""

    evil_empire = {
        'People of the Sun': {}, 'Bulls on Parade': {}, 'Vietnow': {}, 'Revolver': {}, 'Snakecharmer': {},
        'Tire Me': {}, 'Down Rodeo': {}, 'Without a Face': {}, 'Wind Bellow': {}, 'Roll Right': {},
        'Year of tha Boomerang': {}
    }

    for track in evil_empire:
        evil_empire[track] = {'Song': [getrandbits(1000000)]}

    evil_empire['Meta Data'] = {
        'Contributing Artists': ['Zach de la Rocha, Tom Morello, Tim Commerford, Brad Wilk'],
        'Genres': ['Rap Metal, Nu Metal'],
        'Length': '11',
        'Current Position': '1'
    }

    print(strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " : Testing Shuffle v1...")
    initial_position = evil_empire['Meta Data']['Current Position']
    shuffled_position = shuffle_v1(evil_empire)
    delta_shuffle = abs(int(shuffled_position) - int(initial_position))
    print_shuffle_details(initial_position, shuffled_position, delta_shuffle)
    evil_empire['Meta Data']['Current Position'] = int(evil_empire['Meta Data']['Length']) / 2
    initial_position = evil_empire['Meta Data']['Current Position']
    shuffled_position = shuffle_v1(evil_empire)
    delta_shuffle = abs(int(shuffled_position) - int(initial_position))
    print_shuffle_details(initial_position, shuffled_position, delta_shuffle)
    evil_empire['Meta Data']['Current Position'] = int(evil_empire['Meta Data']['Length']) - 1
    initial_position = evil_empire['Meta Data']['Current Position']
    shuffled_position = shuffle_v1(evil_empire)
    delta_shuffle = abs(int(shuffled_position) - int(initial_position))
    print_shuffle_details(initial_position, shuffled_position, delta_shuffle)
    print(strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " : Ending test of Shuffle v1...")

    print(strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " : Testing Shuffle v1.1...")
    initial_position = evil_empire['Meta Data']['Current Position']
    shuffled_position = shuffle_v1_1(evil_empire)
    delta_shuffle = abs(int(shuffled_position) - int(initial_position))
    print_shuffle_details(initial_position, shuffled_position, delta_shuffle)
    evil_empire['Meta Data']['Current Position'] = int(evil_empire['Meta Data']['Length']) / 2
    initial_position = evil_empire['Meta Data']['Current Position']
    shuffled_position = shuffle_v1_1(evil_empire)
    delta_shuffle = abs(int(shuffled_position) - int(initial_position))
    print_shuffle_details(initial_position, shuffled_position, delta_shuffle)
    evil_empire['Meta Data']['Current Position'] = int(evil_empire['Meta Data']['Length']) - 1
    initial_position = evil_empire['Meta Data']['Current Position']
    shuffled_position = shuffle_v1_1(evil_empire)
    delta_shuffle = abs(int(shuffled_position) - int(initial_position))
    print_shuffle_details(initial_position, shuffled_position, delta_shuffle)
    print(strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " : Ending test of Shuffle v1.1...")

    print(strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " : Testing Shuffle v2...")
    initial_position = evil_empire['Meta Data']['Current Position']
    shuffled_position = shuffle_v2(evil_empire)
    delta_shuffle = abs(int(shuffled_position) - int(initial_position))
    print_shuffle_details(initial_position, shuffled_position, delta_shuffle)
    evil_empire['Meta Data']['Current Position'] = int(evil_empire['Meta Data']['Length']) / 2
    initial_position = evil_empire['Meta Data']['Current Position']
    shuffled_position = shuffle_v2(evil_empire)
    delta_shuffle = abs(int(shuffled_position) - int(initial_position))
    print_shuffle_details(initial_position, shuffled_position, delta_shuffle)
    evil_empire['Meta Data']['Current Position'] = int(evil_empire['Meta Data']['Length']) - 1
    initial_position = evil_empire['Meta Data']['Current Position']
    shuffled_position = shuffle_v2(evil_empire)
    delta_shuffle = abs(int(shuffled_position) - int(initial_position))
    print_shuffle_details(initial_position, shuffled_position, delta_shuffle)
    print(strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " : Ending test of Shuffle v2...")

    print(strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " : Testing Shuffle v2.1...")
    initial_position = evil_empire['Meta Data']['Current Position']
    shuffled_permutation = shuffle_v2_1(evil_empire)
    print(strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " : \tShuffle permutation is {0}".format(shuffled_permutation))
    evil_empire['Meta Data']['Current Position'] = int(evil_empire['Meta Data']['Length']) / 2
    initial_position = evil_empire['Meta Data']['Current Position']
    shuffled_permutation = shuffle_v2_1(evil_empire)
    print(strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " : \tShuffle permutation is {0}".format(shuffled_permutation))
    evil_empire['Meta Data']['Current Position'] = int(evil_empire['Meta Data']['Length']) - 1
    initial_position = evil_empire['Meta Data']['Current Position']
    shuffled_permutation = shuffle_v2_1(evil_empire)
    print(strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " : \tShuffle permutation is {0}".format(shuffled_permutation))
    print(strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " : Ending test of Shuffle v2.1...")
