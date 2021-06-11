FROM gitpod/workspace-mongodb

USER root

ENV DEBIAN_FRONTEND noninteractive

RUN sudo apt-get update && sudo rm -rf /var/lib/apt
