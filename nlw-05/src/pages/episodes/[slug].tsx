import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import api from "../../services/api";
import convertDurationToTimeString from "../../utils/convertDurationToTimeString";
import { usePlayer } from "../../contexts/PlayerContext";

import styles from "./episode.module.scss";
import React from "react";
import Head from "next/head";

type Episode = {
  id: string;
  url: string;
  title: string;
  members: string;
  duration: number;
  thumbnail: string;
  description: string;
  publishedAt: string;
  durationAsString: string;
};

type EpisodeProps = {
  episode: Episode;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 2,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const paths = data.map((episode) => ({ params: { slug: episode.id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    url: data.file.url,
    members: data.members,
    thumbnail: data.thumbnail,
    description: data.description,
    publishedAt: format(parseISO(data.published_at), "d MMM yy", {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
  };

  return {
    props: {
      episode,
    },
    revalidate: 86400, // 24 hours
  };
};

export default function Episode({ episode }: EpisodeProps) {
  const router = useRouter();
  const { play } = usePlayer();

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>

      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={200}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}
